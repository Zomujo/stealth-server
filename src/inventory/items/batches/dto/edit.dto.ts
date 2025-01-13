import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBatchDto } from './create.dto';

export class UpdateBatchDto extends PartialType(
  OmitType(CreateBatchDto, ['itemId', 'supplierId']),
) {}
