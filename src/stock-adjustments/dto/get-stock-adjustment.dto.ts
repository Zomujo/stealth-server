import { IntersectionType } from '@nestjs/swagger';
import { CreateStockAdjustmentDto } from './create-stock-adjustment.dto';
import { GenericResponseDto } from 'src/shared/docs/dto/base.dto';

export class OneStockAdjustment extends IntersectionType(
  CreateStockAdjustmentDto,
  GenericResponseDto,
) {}
