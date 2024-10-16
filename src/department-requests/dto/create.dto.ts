import { ApiProperty, OmitType } from '@nestjs/swagger';
import { GetDepartmentRequestDto } from './get.dto';
import {
  DepartmentRequestStatus,
  DepartmentRequestStatusType,
} from '../models/department-requests.model';

export class CreateDepartmentRequestDto extends OmitType(
  GetDepartmentRequestDto,
  ['departmentId'],
) {}

export class UpdateDepartmentRequestDto extends OmitType(
  GetDepartmentRequestDto,
  ['id', 'requestNumber', 'status'],
) {
  @ApiProperty({
    example: 'PENDING',
    enum: DepartmentRequestStatus,
  })
  status: DepartmentRequestStatusType;
}
