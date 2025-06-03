import {
  ApiResponseProperty,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { CreateSettingsDto, CreateUserDto } from './create.dto';
import { GetNoPaginateDto } from '../../core/shared/dto/get-no_paginate.dto';
import { GenericResponseDto } from '../../core/shared/dto/base.dto';

export class GetUserDto extends OmitType(CreateUserDto, [
  'deactivatedBy',
  'deletedAt',
  'deletedBy',
  'facilityId',
]) {
  @ApiResponseProperty({
    type: GetNoPaginateDto,
  })
  facility: GetNoPaginateDto;
}

export class GetSettingsDto extends IntersectionType(
  PickType(GenericResponseDto, ['id']),
  CreateSettingsDto,
) {}
