import { ApiResponseProperty, OmitType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create.dto';
import { PaginationRequestDto } from '../../core/shared/dto/pagination.dto';
import { GetNoPaginateDto } from 'src/core/shared/dto/get-no_paginate.dto';

export class GetNotificationDto extends OmitType(CreateNotificationDto, [
  'departmentName',
]) {
  @ApiResponseProperty({
    type: GetNoPaginateDto,
  })
  department: GetNoPaginateDto;
}

export class FetchNotificationsQueryDto extends OmitType(PaginationRequestDto, [
  'search',
]) {}
