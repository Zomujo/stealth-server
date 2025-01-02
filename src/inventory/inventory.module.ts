import { Module } from '@nestjs/common';
import { StockAdjustmentsService } from './inventory.service';
import { ItemsModule } from './items/items.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ItemsCategoryModule } from './items-category/items-category.module';
import { StockAdjustmentsController } from './inventory.controller';
import { StockAdjustment } from './models/stock-adjustment.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ItemsModule,
    SuppliersModule,
    ItemsCategoryModule,
    SequelizeModule.forFeature([StockAdjustment]),
  ],
  controllers: [StockAdjustmentsController],
  providers: [StockAdjustmentsService],
  exports: [StockAdjustmentsService, ItemsModule],
})
export class InventoryModule {}
