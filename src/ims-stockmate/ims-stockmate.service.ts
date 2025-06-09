import { Injectable } from '@nestjs/common';
import { Commands, IMSQuery, TwilioWebhookDto } from './dto';
import { ItemService } from '../inventory/items/items.service';
import * as yaml from 'js-yaml';
import { format } from 'date-fns';
import { UserService } from '../user/user.service';

@Injectable()
export class ImsStockmateService {
  constructor(
    private itemService: ItemService,
    private userService: UserService,
  ) {}

  async create(dto: TwilioWebhookDto) {
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
    const serializedBody = new IMSQuery(dto.body);

    let data: any;

    switch (serializedBody.command) {
      case Commands.QUERY: {
        const item = await this.itemService.fetchOne({
          query: {
            name: serializedBody.arguments,
            ...ownershipQuery,
          },
          fields: ['name', 'totalQuantity'],
          populate: ['batches', 'category'],
        });
        const itemJson = item.toJSON();
        const formatedBatches = itemJson.batches.map((batch: any) => {
          batch.expiresAt = format(batch.validity, 'EEEE, MMMM do, yyyy');
          delete batch.id;
          delete batch.validity;
          return batch;
        });
        itemJson.batches = formatedBatches;
        data = itemJson;
        break;
      }
      case Commands.LIST: {
        const searchOptions: Record<string, any> = {};
        if (serializedBody.arguments) {
          searchOptions.search = serializedBody.arguments[0];
          searchOptions.searchFields = ['name'];
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
        data = itemsJson;
        break;
      }
      case Commands.STOCK: {
        const items = await this.itemService.fetchAndCountAll({
          query: {
            ...ownershipQuery,
          },
          fields: ['name'],
          sort: 'name',
        });
        const itemsJson = {
          count: items.count,
          rows: items.rows.map((row) => row.toJSON()),
        };
        data = itemsJson;
        break;
      }
      default:
        data = { message: 'unknown command' };
    }
    const serializedOutput = yaml.dump(data);
    return serializedOutput;
  }

  findAll() {
    return `This action returns all imsStockmate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imsStockmate`;
  }
}
