import {
  IntersectionType,
  ApiPropertyOptional,
  ApiProperty,
  ApiResponseProperty,
  PickType,
} from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { GenericResponseDto } from 'src/shared/docs/dto/base.dto';
import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import { Batch, Item, ItemStatus } from '../models';
import { GetNoPaginateDto } from '../../../shared/docs/dto/get-no_paginate.dto';

export class ItemPaginationDto extends IntersectionType(PaginationRequestDto) {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  supplierId: string;

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsOptional()
  categories: string[];

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  facilityId: string;

  @IsUUID()
  @ApiPropertyOptional()
  @IsOptional()
  departmentId: string;
}

export class ItemAnalytics {
  @ApiProperty({
    example: 4500,
    description: 'The total number of items in the system',
  })
  totalItems: number;

  @ApiProperty({
    example: 1200,
    description: 'The total items in stock in the system',
  })
  totalInStock: number;

  @ApiProperty({
    example: 20,
    description: 'The number of items that are out of stock',
  })
  outOfStock: number;

  @ApiProperty({
    example: 50,
    description: 'The number of items that are high in stock',
  })
  highStocked: number;

  @ApiProperty({
    example: 80,
    description: 'The number of items that are low in stock',
  })
  lowStocked: number;
}
export class ItemCounts {
  @ApiProperty({
    example: 4500,
    description: 'The total number of items in the system',
  })
  totalItems: number;

  @ApiProperty({
    example: 1200,
    description: 'The total items in stock in the system',
  })
  totalInStock: number;

  @ApiProperty({
    example: 20,
    description: 'The number of items that are out of stock',
  })
  outOfStock: number;

  @ApiProperty({
    example: 50,
    description: 'The number of items that are high in stock',
  })
  highStocked: number;

  @ApiProperty({
    example: 80,
    description: 'The number of items that are low in stock',
  })
  lowStocked: number;
}

export class OneItem extends IntersectionType(Item, GenericResponseDto) {
  @ApiResponseProperty({
    example: 'John Doe,58dceb42-02bb-465f-bd5d-4b52ef181a18',
  })
  createdBy: string;
}

export class OneBatch extends IntersectionType(Batch, GenericResponseDto) {
  @ApiResponseProperty({
    example: 'John Doe,58dceb42-02bb-465f-bd5d-4b52ef181a18',
  })
  createdBy: string;
}

export class OneBatchResponseDto extends IntersectionType(
  PickType(OneBatch, [
    'id',
    'createdAt',
    'validity',
    'batchNumber',
    'quantity',
  ]),
) {
  @ApiResponseProperty({
    type: GetNoPaginateDto,
  })
  supplier: GetNoPaginateDto;

  @ApiResponseProperty({
    type: GetNoPaginateDto,
  })
  item: GetNoPaginateDto;
}

export class BatchesNoPaginate extends IntersectionType(
  PickType(Batch, ['batchNumber', 'quantity']),
  PickType(GenericResponseDto, ['id']),
) {}

export class ManyItem {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  brandName: string;
  @ApiProperty({ description: 'Expiry date' })
  validity: Date;
  @ApiProperty()
  batchNumber: string;
  @ApiProperty({ description: 'The quantity of the item in the batch' })
  quantity: number;
  @ApiProperty()
  supplierName: string;
  @ApiProperty()
  supplierId: string;
  @ApiProperty()
  status: ItemStatus;
  @ApiProperty()
  reorderPoint: number;
  @ApiProperty()
  category: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  createdAt: Date;
}
class CategoryDto {
  @ApiResponseProperty({
    example: '52159509-1aee-4d47-8475-47906250423a',
  })
  id: string;

  @ApiResponseProperty({
    example: 'Analgesics',
  })
  name: string;
}

class SupplierDto {
  @ApiResponseProperty({
    example: '6bc6b563-b136-4e5e-ad7c-3624e0bb3986',
  })
  id: string;

  @ApiResponseProperty({
    example: 'Supplier B',
  })
  name: string;
}

export class GetItemsResponseDto extends GenericResponseDto {
  @ApiResponseProperty({
    example: 'Analgesics Item 2',
  })
  name: string;

  @ApiResponseProperty({
    example: 'STOCKED',
  })
  status: string;

  @ApiResponseProperty({
    example: 87,
  })
  reorderPoint: number;

  @ApiResponseProperty({
    type: CategoryDto,
  })
  category: CategoryDto;

  @ApiResponseProperty({
    type: SupplierDto,
  })
  supplier: SupplierDto;

  @ApiResponseProperty({
    example: 2,
  })
  supplierRemainder: number;

  @ApiResponseProperty({
    example: 1497,
  })
  totalStock: number;
}
