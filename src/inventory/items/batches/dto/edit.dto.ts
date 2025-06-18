import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateBatchDto } from './create.dto';
import { UpdateMarkupDto } from '../../markup/dto';
import { IsOptional } from 'class-validator';

export class UpdateBatchDto extends PartialType(
  OmitType(CreateBatchDto, ['itemId', 'supplierId', 'markup']),
) {
  @ApiPropertyOptional({
    type: UpdateMarkupDto,
    description: 'The markup on the batch',
  })
  @IsOptional()
  markup: UpdateMarkupDto;
}
