import { PickType } from '@nestjs/swagger';
import { StockAdjustment } from '../model/stock-adjustment.model';

export class CreateStockAdjustmentDto extends PickType(StockAdjustment, [
  'reason',
  'notes',
  'type',
  'currentStock',
  'actualStock',
  'drugId',
  'facilityId',
  'departmentId',
]) {}
