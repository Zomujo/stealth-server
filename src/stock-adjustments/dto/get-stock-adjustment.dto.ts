import { IntersectionType } from '@nestjs/swagger';
import { GenericResponseDto } from 'src/shared/docs/dto/base.dto';
import { CreateStockAdjustmentDto } from '.';

export class OneStockAdjustment extends IntersectionType(
  CreateStockAdjustmentDto,
  GenericResponseDto,
) {}
