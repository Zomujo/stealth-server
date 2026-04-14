import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class ExportQueryDto {
  @ApiProperty({ example: 'csv', enum: ['csv', 'xlsx'] })
  @IsNotEmpty()
  @IsIn(['csv', 'xlsx'])
  exportType: 'csv' | 'xlsx';
}

export enum IMSLocations {
  NORTHERN = 'NORTHERN',
  SAVANNAH = 'SAVANNAH',
}

export class LocationQueryDto {
  @ApiProperty({ example: IMSLocations.NORTHERN, enum: IMSLocations })
  @IsNotEmpty()
  @IsEnum(IMSLocations)
  location: IMSLocations;

  @ApiPropertyOptional({
    example: 30,
    description: 'The last number of days to include in the export',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  lastXDays: number;

  @ApiPropertyOptional({
    type: Date,
    example: new Date(),
    description: 'Start date for export (yyyy-mm-dd)',
  })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({
    type: Date,
    example: new Date(),
    description: 'End date for export (yyyy-mm-dd)',
  })
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
