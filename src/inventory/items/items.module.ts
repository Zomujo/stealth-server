import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemController } from './items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Batch, Item } from './models';
import { Supplier } from '../suppliers/models/supplier.model';
import { User } from '../../auth/models/user.model';
import { ItemExistsRule } from '../../core/shared/validators';
import { BatchesModule } from './batches/batches.module';
import { BatchService } from './batches/batch.service';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Item, Batch, Supplier, User]),
    BatchesModule,
    SuppliersModule,
    NotificationModule,
  ],
  controllers: [ItemController],
  providers: [ItemService, BatchService, ItemExistsRule],
  exports: [ItemService, BatchService],
})
export class ItemsModule {}
