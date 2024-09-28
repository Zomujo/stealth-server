import { IntersectionType } from '@nestjs/swagger';
import { CreateDrugDto } from 'src/inventory/drugs/dto';
import { GenericResponseDto } from 'src/shared/docs/dto/base.dto';
import { GetManyDto } from 'src/shared/docs/dto/get-may.dto';

export class GetSupplierDto extends IntersectionType(GetManyDto) {}

export class SupplierResponse extends IntersectionType(
  CreateDrugDto,
  GenericResponseDto,
) {}
