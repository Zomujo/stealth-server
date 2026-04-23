import { IntersectionType, PickType } from '@nestjs/swagger';
import { PaginationRequestDto } from '../../core/shared/dto/pagination.dto';
import { CreatePatientResponseDto } from './create.dto';

export class RetrievePatientsDto extends IntersectionType(
  PickType(CreatePatientResponseDto, [
    'id',
    'name',
    'cardIdentificationNumber',
    'gender',
  ]),
) {}
export class RetrievePatientDto extends CreatePatientResponseDto {}

export class FindPatientDto extends PickType(PaginationRequestDto, ['search']) {
  facilityId: string;
  departmentId?: string;
}
