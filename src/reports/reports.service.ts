import { Injectable } from '@nestjs/common';
import { Report } from './models/reports.models';
import { CreateReportDto } from './dto/create.dto';

@Injectable()
export class ReportsService {
  constructor() {}

  async fetchAll() {
    return [];
  }

  async create(_: CreateReportDto) {
    return null;
  }

  async fetchOne(_: Report['id']) {
    return null;
  }

  async removeOne(_: Report['id']) {
    return null;
  }
}
