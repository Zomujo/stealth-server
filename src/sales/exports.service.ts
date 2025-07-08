import { Injectable, NotImplementedException } from '@nestjs/common';
import { generateExportQuery } from './sql';
import { IUserPayload } from '../auth/interface/payload.interface';
import { generateExportFilename } from '../core/shared/factory';
import { ExportsService } from '../exports/exports.service';
import { ExportSalesQueryDto } from './dto';

@Injectable()
export class SalesExportsService {
  constructor(private readonly exportService: ExportsService) {}
  /**
   * Exports Audits.
   *
   * @param user - The body containing the user's information.
   * @returns A promise that resolves to the created readable stream.
   * @throws If any error occurs during the creation process.
   */
  async exportAudits(query: ExportSalesQueryDto, user: IUserPayload) {
    switch (query.exportType) {
      case 'csv':
        return await this.exportAuditsCsv(query, user);
      case 'xlsx':
        return await this.exportAuditsExcel(query, user);
      default:
        throw new NotImplementedException('Not yet implemented');
    }
  }

  /**
   * Exports Sales in csv.
   *
   * @param user - The body containing the user's information.
   * @returns A promise that resolves to the created readable stream.
   * @throws If any error occurs during the creation process.
   */
  private async exportAuditsCsv(
    query: ExportSalesQueryDto,
    user: IUserPayload,
  ) {
    const sql = generateExportQuery(query, {
      facility: user.facility,
      department: user.department,
    });
    console.log('sales', sql);
    const salesCsv = await this.exportService.exportStockCsv(sql, {
      fields: [
        'Patient ID',
        'Item(s)',
        'Total Amount',
        'Date Created',
        'Payment Type',
      ],
    });
    const fileName = generateExportFilename('Sales', 'csv');
    return {
      data: salesCsv,
      meta: {
        fileName,
        type: 'text/csv',
      },
    };
  }

  /**
   * Exports Sales in xlsx (excel).
   *
   * @param user - The body containing the user's information.
   * @returns A promise that resolves to the created readable stream.
   * @throws If any error occurs during the creation process.
   */
  private async exportAuditsExcel(
    query: ExportSalesQueryDto,
    user: IUserPayload,
  ) {
    const sql = generateExportQuery(query, {
      facility: user.facility,
      department: user.department,
    });
    const salesXlsx = await this.exportService.exportStockCsv(sql, {
      fields: [
        'Patient ID',
        'Item(s)',
        'Total Amount',
        'Date Created',
        'Payment Type',
      ],
    });
    const fileName = generateExportFilename('Sales', 'xlsx');
    return {
      data: salesXlsx,
      meta: {
        fileName,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    };
  }
}
