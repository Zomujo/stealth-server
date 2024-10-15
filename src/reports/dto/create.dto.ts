import { OmitType } from '@nestjs/swagger';
import { GetReportDto } from './get.dto';

export class CreateReportDto extends OmitType(GetReportDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
