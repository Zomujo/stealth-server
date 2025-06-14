import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ParsedImsStockQlCommand, TwilioWebhookDto } from './dto';
import { ItemService } from '../inventory/items/items.service';
import * as yaml from 'js-yaml';
import { addDays, format, startOfToday } from 'date-fns';
import { UserService } from '../user/user.service';
import { ImsStockQlService } from './ims-stockql.service';
import { Op } from 'sequelize';
import { ItemCategory } from '../inventory/items-category/models/items-category.model';
import { Batch } from '../inventory/items/models';
import { BatchService } from '../inventory/items/batches/batch.service';
import { SalesService } from '../sales/sales.service';
import { SalePaymentType } from '../sales/models/sales.model';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class ImsStockmateService {
  constructor(
    private itemService: ItemService,
    private imsStockQlService: ImsStockQlService,
    private batchService: BatchService,
    private userService: UserService,
    private salesService: SalesService,
    private patientService: PatientService,
  ) {}

  async create(dto: TwilioWebhookDto) {
    const regex = /\+\d*/;
    dto.from = dto.from.match(regex)[0];
    const user = await this.userService.fetchOne({
      query: {
        phoneNumber: dto.from,
      },
      fields: ['id', 'facilityId', 'departmentId'],
    });
    const ownershipQuery = {
      facilityId: user.facilityId,
      departmentId: user.departmentId,
    };
    // const serializedBody = new IMSQuery(dto.body);
    const parsedCommands = this.imsStockQlService.parse(dto.body);

    const responses = await Promise.all(
      parsedCommands.map(async (cmd) => {
        try {
          const result = await this.handleParsedCommand(
            cmd,
            ownershipQuery,
            user.id,
          );
          return result;
        } catch (error) {
          if (error instanceof HttpException) {
            return {
              statusCode: error.getStatus(),
              message: error.message,
            };
          } else {
            return {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: error.message,
            };
          }
        }
      }),
    );

    const serializedOutput = yaml.dump({ responses });
    return serializedOutput;
  }

  async handleParsedCommand(
    command: ParsedImsStockQlCommand,
    ownershipQuery: Record<string, any>,
    userId: string,
  ): Promise<any> {
    if (command.errorOptions && command.errorOptions.error) {
      return {
        action: command.action,
        message: `❌${command.errorOptions.error}`,
      };
    }

    switch (command.action) {
      default:
        return { message: '🤖 Unknown action' };

      case 'STOCK': {
        const cmd = command.stockOptions;
        console.log('expiry date', cmd.expiresAt);
        const batch = await this.batchService.stock({
          itemName: cmd.item,
          batchNumber: cmd.batch,
          quantity: cmd.quantity,
          ...(cmd.expiresAt && { validity: cmd.expiresAt }),
          createdById: userId,
          facilityId: ownershipQuery.facilityId,
          departmentId: ownershipQuery.departmentId,
        });
        const jsonBatch = {
          status: batch.status,
          createdAt: format(batch.createdAt, 'EEEE, MMMM do, yyyy'),
          expiresAt: format(batch.validity, 'EEEE, MMMM do, yyyy'),
          batchNumber: batch.batchNumber,
          quantity: batch.quantity,
        };
        return {
          batch: jsonBatch,
          message: `✅ Stocked ${cmd.quantity} ${cmd.item}(s) to batch ${cmd.batch}`,
        };
      }
      case 'SELL': {
        const cmd = command.sellOptions;
        const sale = await this.salesService.smsSale({
          ...(cmd.patientCardId && { patientCardId: cmd.patientCardId }),
          paymentType: cmd.paymentType ?? SalePaymentType.CASH,
          saleItems: cmd.saleItems,
          createdById: userId,
          facilityId: ownershipQuery.facilityId,
          departmentId: ownershipQuery.departmentId,
        });

        const jsonSale = {
          status: sale.status,
          paymentType: sale.paymentType,
          saleNumber: sale.saleNumber,
          subTotal: sale.subTotal,
          total: sale.total,
        };
        return {
          sale: jsonSale,
          message: `✅ Sale completed successfully`,
        };
      }
      case 'QUERY': {
        const cmd = command.queryOptions;
        const item = await this.itemService.fetchOne({
          query: {
            name: { [Op.iLike]: `%${cmd.item}%` },
            ...ownershipQuery,
          },
          fields: ['name', 'totalQuantity'],
          populate: [
            {
              model: Batch,
              attributes: ['batchNumber', 'quantity', 'validity'],
            },
            { model: ItemCategory, attributes: ['name'] },
          ],
        });
        const itemJson = item.toJSON();
        const formatedBatches = itemJson.batches.map((batch: any) => {
          batch.expiresAt = format(batch.validity, 'EEEE, MMMM do, yyyy');
          delete batch.validity;
          return batch;
        });
        itemJson.batches = formatedBatches;
        return itemJson;
      }
      case 'LIST': {
        const cmd = command.listOptions;
        const whereOptions: Record<string, any> = {};
        if (cmd.listType === 'ITEMS') {
          const searchOptions: Record<string, any> = {};
          if (cmd.item) {
            searchOptions.search = cmd.item;
            searchOptions.searchFields = ['name'];
          }
          if (cmd.expireType) {
            if (cmd.expireType.toUpperCase() === 'EXPIRES' && cmd.days) {
              const today = startOfToday();
              const daysFromNow = addDays(today, cmd.days);
              whereOptions.validity = {
                [Op.between]: [today, daysFromNow],
              };
            } else if (cmd.expireType.toUpperCase() === 'EXPIRED') {
              const today = startOfToday();
              whereOptions.validity = {
                [Op.lt]: today,
              };
            }
            searchOptions.populate = [
              {
                model: Batch,
                attributes: ['batchNumber', 'quantity', 'validity'],
                where: {
                  ...whereOptions,
                },
                order: [['validity', 'ASC']],
              },
            ];
          }
          const items = await this.itemService.fetchAndCountAll({
            query: {
              ...ownershipQuery,
            },
            ...searchOptions,
            fields: ['name'],
            sort: 'name',
          });
          const itemsJson = {
            count: items.count,
            rows: items.rows.map((row) => row.toJSON()),
          };
          return itemsJson;
        } else if (cmd.listType === 'BATCHES') {
          return { message: 'yet to be implemented' };
        } else if (cmd.listType === 'PATIENTS') {
          const patients = await this.patientService.findAndCount({
            query: {
              ...(cmd.patientQuery && {
                [Op.or]: [
                  { name: { [Op.iLike]: `%${cmd.patientQuery}%` } },
                  {
                    cardIdentificationNumber: {
                      [Op.iLike]: `%${cmd.patientQuery}%`,
                    },
                  },
                ],
              }),
            },
            fields: ['name', 'cardIdentificationNumber'],
          });
          const patientsJson = {
            total: patients.count,
            patients: patients.rows.map((patient) => patient.toJSON()),
          };
          return patientsJson;
        }
      }
    }

    return { message: '🤖 Unknown action' };
  }

  findAll() {
    return `This action returns all imsStockmate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imsStockmate`;
  }
}
