import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsString,
  IsEnum,
  IsOptional,
  IsObject,
  IsNumber,
} from 'class-validator';
import { GenericResponseDto } from '../../core/shared/dto/base.dto';

export class AuditLogDto extends GenericResponseDto {
  @ApiProperty({
    description: 'ID of the user who performed the action',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Action performed',
    enum: ['CREATE', 'UPDATE', 'DELETE'],
  })
  @IsEnum(['CREATE', 'UPDATE', 'DELETE'])
  action: 'CREATE' | 'UPDATE' | 'DELETE';

  @ApiProperty({
    description: 'Name of the table affected',
  })
  @IsString()
  tableName: string;

  @ApiProperty({
    description: 'ID of the record affected',
  })
  @IsString()
  recordId: string;

  @ApiProperty({
    description: 'State of the record before the action',
    type: 'object',
    additionalProperties: true,
  })
  @IsObject()
  before: object;

  @ApiProperty({
    description: 'State of the record after the action',
    type: 'object',
    additionalProperties: true,
  })
  @IsObject()
  after: object;

  @ApiPropertyOptional({
    description: 'Description of the action',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'IP address of the user',
  })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent string',
  })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Source of the request',
  })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({
    description: 'Request URL',
  })
  @IsOptional()
  @IsString()
  requestUrl?: string;

  @ApiPropertyOptional({
    description: 'HTTP method used',
  })
  @IsOptional()
  @IsString()
  method?: string;

  @ApiPropertyOptional({
    description: 'Context of the request',
  })
  @IsOptional()
  @IsString()
  context?: string;

  @ApiPropertyOptional({
    description: 'HTTP status code',
  })
  @IsOptional()
  @IsNumber()
  statusCode?: number;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
  })
  @IsOptional()
  @IsString()
  correlationId?: string;
}
