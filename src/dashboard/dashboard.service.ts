import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  create(_dto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: string) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: string, _dto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: string) {
    return `This action removes a #${id} dashboard`;
  }
}
