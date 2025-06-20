import { PartialType } from '@nestjs/swagger';
import { AuditLogDto } from './get.dto';

export class CreateAuditDto extends PartialType(AuditLogDto) {}
