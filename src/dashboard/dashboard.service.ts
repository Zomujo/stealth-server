import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: string) {
    return `This action returns a #${id} dashboard`;
  }
}
