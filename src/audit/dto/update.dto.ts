import { PartialType } from '@nestjs/swagger';
import { CreateAuditDto } from './create.dto';

export class UpdateAuditDto extends PartialType(CreateAuditDto) {}
