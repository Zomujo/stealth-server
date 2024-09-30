import { PickType } from '@nestjs/swagger';
import { Department, Facility } from '../models/inventory.model';

export class CreateFacilityDto extends PickType(Facility, [
  'name',
  'region',
  'location',
]) {}

export class CreateDepartmentDto extends PickType(Department, [
  'name',
  'facilityId',
]) {}
