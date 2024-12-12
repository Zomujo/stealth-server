import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  PickType,
} from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import { GenericResponseDto } from 'src/shared/docs/dto/base.dto';
import { Batch, Item } from '../models';
import { Supplier } from '../../suppliers/models/supplier.model';
import { ItemCategory } from '../../items-category/models/items-category.model';

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
    example: 100,
    description: 'The total number of items in the system',
  })
  totalItems: number;

  @ApiProperty({ example: 10, description: 'The number of item requests' })
  itemRequests: number;

  @ApiProperty({
    example: 5,
    description: 'The percentage increment of item requests',
  })
  itemIncrement: number;

  @ApiProperty({
    example: 10,
    description: 'The number of item request increments',
  })
  requestIncrement: number;

  @ApiProperty({
    example: 20,
    description: 'The number of items that are out of stock',
  })
  outOfStock: number;

  @ApiProperty({
    example: 50,
    description: 'The number of items that are in stock',
  })
  stocked: number;

  @ApiProperty({
    example: 80,
    description: 'The number of items that are low in stock',
  })
  lowStocked: number;
}

export class OneItem extends IntersectionType(Item, GenericResponseDto) {
  @ApiProperty({ description: 'The batches of the item', type: () => Batch })
  batches: Batch[];
}

export class ManyItem extends IntersectionType(
  PickType(Item, ['name', 'status', 'reorderPoint']),
  GenericResponseDto,
) {
  @ApiProperty({
    description: 'The category of the item',
    example: {
      id: '52159509-1aee-4d47-8475-47906250423a',
      name: 'Analgesics',
    },
  })
  category: ItemCategory;

  @ApiProperty({
    description: 'The suppliers involved with the item',
    example: [
      {
        id: '235eab15-b5b5-4a89-b8ff-ca1d923d58f0',
        name: 'Supplier A',
      },
    ],
  })
  suppliers: Supplier[];

  @ApiProperty({ description: 'Total stock of items', example: 2748 })
  totalStock: number;
}
