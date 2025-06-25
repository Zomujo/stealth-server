import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum OrderDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum DateRange {
  TODAY = 'today',
  THIS_WEEK = 'this_week',
  THIS_MONTH = 'this_month',
  LAST_MONTH = 'last_month',
  LAST_THREE_MONTHS = 'last_three_months',
  THIS_YEAR = 'this_year',
}

export class PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string;

  // @ApiPropertyOptional({
  //   type: [String],
  //   description: 'Fields to search within',
  // })
  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  searchFields?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pageSize: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderBy: string;

  @ApiPropertyOptional({
    enum: OrderDirectionType,
  })
  @IsOptional()
  @IsEnum(OrderDirectionType)
  orderDirection: OrderDirectionType;

  @ApiPropertyOptional({
    enum: DateRange,
  })
  @IsOptional()
  @IsEnum(DateRange)
  dateRange: DateRange;
}
