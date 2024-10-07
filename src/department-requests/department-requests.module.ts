import { Module } from '@nestjs/common';
import { DepartmentRequestsService } from './department-requests.service';
import { DepartmentRequestsController } from './department-requests.controller';
import { DepartmentRequest } from './models/department-requests.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([DepartmentRequest])],
  controllers: [DepartmentRequestsController],
  providers: [DepartmentRequestsService],
})
export class DepartmentRequestsModule {}
