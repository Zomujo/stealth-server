import { IntersectionType } from '@nestjs/swagger';
import { Department, Facility } from '../models/inventory.model';
import { GenericResponseDto } from 'src/shared/docs/dto/base.dto';

export class FacilityResponse extends IntersectionType(
  Facility,
  GenericResponseDto,
) {}
export class DepartmentResponse extends IntersectionType(
  Department,
  GenericResponseDto,
) {}
