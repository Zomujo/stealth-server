import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './models/department.model';
import { User } from '../../auth/models/user.model';
import { DepartmentExistsRule } from '../../shared/validators';

@Module({
  imports: [SequelizeModule.forFeature([Department, User])],
  providers: [DepartmentService, DepartmentExistsRule],
  controllers: [DepartmentController],
  exports: [DepartmentService],
})
export class DepartmentModule {}
