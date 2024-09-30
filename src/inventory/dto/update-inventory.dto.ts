import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto, CreateFacilityDto } from './create-inventory.dto';

export class UpdateFacilityDto extends PartialType(CreateFacilityDto) {}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}
