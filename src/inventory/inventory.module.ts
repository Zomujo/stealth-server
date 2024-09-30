import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { FacilityService } from './facility.service';
import { DrugsModule } from './drugs/drugs.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { DrugsCategoryModule } from './drugs-category/drugs.-category.module';
import { Department, Facility } from './models/inventory.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartmentService } from './department.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/interface/jwt.config';

@Module({
  imports: [
    DrugsModule,
    SuppliersModule,
    DrugsCategoryModule,
    SequelizeModule.forFeature([Department, Facility]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [InventoryController],
  providers: [FacilityService, DepartmentService],
})
export class InventoryModule {}
