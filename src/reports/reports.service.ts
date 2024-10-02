import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './models/reports.models';
import { CreateReportDto } from './dto/create.dto';
import { InjectModel } from '@nestjs/sequelize';
import { GetReportDto, GetReportPaginationDto } from './dto/get.dto';
import { FindAndCountOptions, Op } from 'sequelize';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report) private reportRepository: typeof Report) {}

  async fetchAll(query: GetReportPaginationDto) {
    const whereConditions: Record<string, Record<any, any>> = {};

    if (query.reportName) {
      whereConditions.reportName = { [Op.iLike]: `%${query.reportName}%` };
    }

    if (query.nameInExport) {
      whereConditions.nameInExport = { [Op.iLike]: `%${query.nameInExport}%` };
    }

    if (query.startDate || query.endDate) {
      whereConditions.createdAt = {
        ...(query.startDate && { [Op.gte]: new Date(query.startDate) }),
        ...(query.endDate && { [Op.lte]: new Date(query.endDate) }),
      };
    }

    const filter: FindAndCountOptions<Report> = {
      where: whereConditions,
      limit: query.pageSize || 10,
      offset: query.pageSize * (query.page - 1) || 0,
      order: query.orderBy && [[query.orderBy, 'ASC']],
    };

    const { rows, count } = await this.reportRepository.findAndCountAll(filter);

    return { rows: rows.map((report) => new GetReportDto(report)), count };
  }

  async create(dto: CreateReportDto) {
    const report = await this.reportRepository.create({
      ...dto,
    });

    return new GetReportDto(report);
  }

  async fetchOne(id: string) {
    const report = await this.reportRepository.findByPk(id);
    if (!report) {
      throw new NotFoundException(`No report found`);
    }

    return new GetReportDto(report);
  }

  async removeOne(id: string) {
    const destroyedRows = await this.reportRepository.destroy({
      where: { id },
    });

    if (destroyedRows == 0) {
      throw new NotFoundException(`No report found`);
    }
  }
}
