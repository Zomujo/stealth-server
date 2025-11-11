import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty } from 'class-validator';

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
}
