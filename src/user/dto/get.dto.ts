import { ApiResponseProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create.dto';
import { GetNoPaginateDto } from '../../shared/docs/dto/get-no_paginate.dto';

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
