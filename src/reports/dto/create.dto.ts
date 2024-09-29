import { IsDate, IsNotEmpty } from 'class-validator';
import {
  Report,
  ReportLayout,
  ReportLayoutType,
} from '../models/reports.models';
import { ApiProperty, ApiResponseProperty, PickType } from '@nestjs/swagger';
import { ApiSuccessResponseDto } from 'src/utils/responses/success.response';
import { GetReportDto } from './get.dto';

const reportPickType = PickType(Report, [
  'reportName',
  'nameInExport',
  'startDate',
  'endDate',
] as const);

export class CreateReportDto extends reportPickType {
  @ApiProperty({
    example: 'Monthly Report',
    description: 'The name name of the report',
  })
  @IsNotEmpty()
  reportName: string;

  @ApiProperty({
    example: 'montly_report_Aug_2024',
    description: 'The name to be used when exporting',
  })
  @IsNotEmpty()
  nameInExport: string;

  @ApiProperty({
    example: '2024-08-01',
    description: 'The start date of the report',
  })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: '2024-08-31',
    description: 'The end date of the report',
  })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @ApiProperty({
    example: 'PORTRAIT',
    description: 'The layout of the report',
    enum: ReportLayout,
  })
  @IsNotEmpty()
  reportLayout: ReportLayoutType;
}

export class CreateReportSuccessDto extends ApiSuccessResponseDto<GetReportDto> {
  @ApiResponseProperty({
    type: GetReportDto,
  })
  data: GetReportDto;
}
