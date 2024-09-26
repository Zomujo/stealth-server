import { Module } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { DrugsController } from './drugs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Drug } from './models/drug.model';
import { SuppliersService } from '../suppliers/suppliers.service';
import { DrugsCategoryService } from '../drugs-category/drugs-category.service';
import { DrugsCategory } from '../drugs-category/models/drugs-category.model';
import { Supplier } from '../suppliers/models/supplier.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Drug, DrugsCategory, Supplier])
  ],
  controllers: [DrugsController],
  providers: [DrugsService, SuppliersService, DrugsCategoryService],
})
export class DrugsModule {}
