import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import { CreateSaleDto, CreateSaleResponseDto } from './create.dto';
import {
  ApiPropertyOptional,
  PickType,
  OmitType,
  IntersectionType,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaymentStatus } from '../models/sales.models';
import { GenericResponseDto } from '../../shared/docs/dto/base.dto';

export class GetSalesDto extends IntersectionType(
  OmitType(CreateSaleDto, [
    'subTotal',
    'saleItems',
    'patientId',
    'paymentType',
  ]),
  OmitType(GenericResponseDto, ['updatedAt']),
) {
  @ApiResponseProperty({
    example: {
      id: '4f2dd5bb-ae60-41ca-9227-0fb3dacebcbe',
      cardIdentificationNumber: 'gh-56387082875',
    },
  })
  patient: object;

  @ApiResponseProperty({
    example: {
      item: {
        name: 'Some Item',
        brandName: 'Some Item Brand',
        sellingPrice: 85.01,
      },
      batchId: 'e0ef0214-d468-49a8-8f6e-45334e2da751b',
      batchNumber: 'BATCH3464e1',
    },
  })
  saleItem: object;

  @ApiResponseProperty({
    example: 0,
  })
  remainderItems: number;

  @ApiResponseProperty({
    example: 2,
  })
  totalQuantity: number;
}

export class GetSaleDto extends OmitType(CreateSaleResponseDto, [
  'patientId',
  'saleItems',
  'deletedAt',
  'deletedBy',
]) {
  @ApiResponseProperty({
    example: {
      id: '4f2dd5bb-ae60-41ca-9227-0fb3dacebcbe',
      cardIdentificationNumber: 'gh-56387082875',
    },
  })
  patient: object;

  @ApiResponseProperty({
    example: [
      {
        item: {
          name: 'Some Item',
          brandName: 'Some Item Brand',
          sellingPrice: 85.01,
        },
        batchId: 'e0ef0214-d468-49a8-8f6e-45334e2da751b',
        quantity: 2,
        batchNumber: 'BATCH3464e1',
      },
    ],
  })
  saleItems: object[];
}

export class GetSalesPaginationDto extends PaginationRequestDto {
  @ApiPropertyOptional({
    enum: PaymentStatus,
    description: 'The various payment statuses',
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}

export class FindItemDto extends PickType(PaginationRequestDto, [
  'search',
  'page',
  'pageSize',
]) {}

export class GetSalesItemsDto {
  @ApiResponseProperty({
    example: 'e0ef0214-d468-49a8-8f6e-453912da751b',
  })
  batchId: string;

  @ApiResponseProperty({
    example: 'BATCH4325',
  })
  batchNumber: string;

  @ApiResponseProperty({
    example: new Date(),
  })
  validity: string;

  @ApiResponseProperty({
    example: 20,
  })
  quantity: number;

  @ApiResponseProperty({
    example: {
      name: 'Some Item',
      brandName: 'Some Item brand',
      sellingPrice: 47.01,
    },
  })
  item: object;
}
