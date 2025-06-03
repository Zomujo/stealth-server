import { IntersectionType } from '@nestjs/swagger';
import { Facility } from '../models/facility.model';
import { GenericResponseDto } from '../../../core/shared/dto/base.dto';

export class FacilityResponse extends IntersectionType(
  Facility,
  GenericResponseDto,
) {}
