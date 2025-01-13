import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Supplier } from './models/supplier.model';
import { SupplierExistsRule } from '../../shared/validators';

@Module({
  imports: [SequelizeModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [SuppliersService, SupplierExistsRule],
  exports: [SuppliersService],
})
export class SuppliersModule {}
