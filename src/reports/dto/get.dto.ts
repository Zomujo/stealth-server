import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import {
  ApiPropertyOptional,
  ApiResponseProperty,
  IntersectionType,
  OmitType,
} from '@nestjs/swagger';
import { GenericResponseDto } from 'src/core/shared/dto/base.dto';
import { PaginationRequestDto } from 'src/core/shared/dto/pagination.dto';
import { CreateReportDto, ReportCategories } from './create.dto';
import { Type } from 'class-transformer';
import { addDays } from 'date-fns';

export class GetReportDto extends IntersectionType(
  CreateReportDto,
  GenericResponseDto,
) {}

export class GetReportPaginationDto extends OmitType(PaginationRequestDto, [
  'search',
]) {
  @ApiPropertyOptional({
    description: 'The type of the report',
    example: 'periodic_sales_reports',
    enum: ReportCategories,
  })
  @IsOptional()
  @IsEnum(ReportCategories)
  reportType: ReportCategories;
}

export class FindReportDataDto {
  @ApiPropertyOptional({
    example: new Date(),
  })
  @IsOptional()
  @Type(() => Date)
  startDate: Date;

  @ApiPropertyOptional({ example: addDays(new Date(), 1) })
  @IsOptional()
  @Type(() => Date)
  endDate: Date;

  @ApiPropertyOptional({
    description: 'The specific date of data to be queried for the report',
    example: new Date(),
  })
  @IsOptional()
  @Type(() => Date)
  specificDate: Date;

  @ApiPropertyOptional({
    description: 'The limit for which data should be sent',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  limit: number;
}

export class GetReportDataDto {
  @ApiResponseProperty({
    example: 0,
  })
  count: number;

  @ApiResponseProperty({
    example: [],
  })
  rows: object[];
}
