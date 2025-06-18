import { PickType } from '@nestjs/swagger';
import { MarkupDto } from './markup.dto';

export class GetMarkupDto extends PickType(MarkupDto, [
  'type',
  'amount',
  'amountType',
]) {}
