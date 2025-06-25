import {
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { PaginationRequestDto } from '../../core/shared/dto/pagination.dto';
import { AuditLogDto } from './model.dto';
import { IsOptional, IsString } from 'class-validator';

export class FindAuditLogQueryDto extends IntersectionType(
  PickType(AuditLogDto, [
    'action',
    'tableName',
    'description',
    'userId',
    'startDate',
    'endDate',
  ]),
  OmitType(PaginationRequestDto, ['dateRange', 'search', 'searchFields']),
) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  departmentId?: string;

  facilityId?: string;

  userDepartmentId?: string;
}

export class AuditLogsResponseDto extends PickType(AuditLogDto, [
  'id',
  'userId',
  'user',
  'action',
  'tableName',
  'description',
  'recordId',
  'departmentId',
  'department',
  'createdAt',
  'updatedAt',
]) {}
export class AuditLogResponseDto extends OmitType(AuditLogDto, [
  'ipAddress',
  'userAgent',
  'context',
  'correlationId',
  'method',
  'requestUrl',
  'source',
  'statusCode',
]) {}
