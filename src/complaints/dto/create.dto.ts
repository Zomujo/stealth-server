import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum SystemFeatures {
  ITEMS = 'items',
  BATCHES = 'batches',
  ITEMS_CATEGORIES = 'item_categories',
  STOCK_ADJUSTMENT = 'stock_adjustment',
  ITEM_ORDERS = 'item_orders',
  REPORTS = 'reports',
  SUPPLIERS = 'suppliers',
  SALES = 'sales',
  DEPARTMENT_REQUESTS = 'department_requests',
  ITEM_REQUESTS = 'item_requests',
  DEPARTMENTS = 'departments',
  USERS = 'users',
}
export class CreateComplaintDto {
  @ApiProperty({
    example: 'items',
    description: 'The feature the user found the issue',
    enum: SystemFeatures,
  })
  @IsNotEmpty()
  @IsEnum(SystemFeatures)
  feature: SystemFeatures;

  @ApiProperty({
    example: 'I have issues with logging in',
    description: 'The complaint lodged by the user',
  })
  @IsNotEmpty()
  @IsString()
  complaint: string;

  @ApiProperty({
    example: new Date(),
    description: 'The datetime the issue occured',
  })
  @IsNotEmpty()
  @Type(() => Date)
  dateTimeIssueOccured: Date;

  @ApiPropertyOptional({
    example: 'Item not found',
    description: 'The error message seen by the user',
  })
  @IsOptional()
  @IsString()
  errorMessage: string;
}
