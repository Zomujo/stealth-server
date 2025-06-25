import { PartialType } from '@nestjs/swagger';
import { AuditLogDto } from './model.dto';

export class CreateAuditDto extends PartialType(AuditLogDto) {}
