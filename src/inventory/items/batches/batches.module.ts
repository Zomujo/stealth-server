import { Module } from '@nestjs/common';
import { BatchExistsRule } from '../../../core/shared/validators';
import { BatchService } from './batch.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Batch } from '../models';
import { SuppliersModule } from '../../suppliers/suppliers.module';

@Module({
  imports: [SequelizeModule.forFeature([Batch]), SuppliersModule],
  providers: [BatchService, BatchExistsRule],
  exports: [BatchService],
})
export class BatchesModule {}
