import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import {
  GetSalesDto,
  CreateSaleDto,
  UpdateSalesDto,
  GetSalesPaginationDto,
  FindItemDto,
  CreateSaleResponseDto,
  GetSaleDto,
  GetSalesItemsDto,
} from './dto/';
import { ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators';
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  PaginatedDataResponseDto,
} from 'src/utils/responses/success.response';
import { throwError } from 'src/utils/responses/error.response';
import { GetUser } from '../auth/decorator';
import { IUserPayload } from '../auth/interface/payload.interface';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  private logger = new Logger(SalesController.name);

  constructor(private readonly salesService: SalesService) {}

  @CustomApiResponse(['authorize', 'paginated'], {
    type: GetSalesItemsDto,
    message: 'Items retrieved successfully',
  })
  @Get('/items')
  async getItems(@Query() query: FindItemDto, @GetUser() user: IUserPayload) {
    try {
      const response = await this.salesService.fetchItems(query, user);
      return new ApiSuccessResponseDto(
        new PaginatedDataResponseDto<object[]>(
          response.rows,
          query.page || 1,
          query.pageSize,
          response.count,
        ),
        HttpStatus.OK,
        'Items retrieved successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['authorize', 'created'], {
    type: CreateSaleResponseDto,
    message: 'Sales created successfully',
  })
  @Post()
  async create(
    @Body() createSaleDto: CreateSaleDto,
    @GetUser() user: IUserPayload,
  ) {
    try {
      const response = await this.salesService.create(createSaleDto, user);

      return new ApiSuccessResponseDto(
        response,
        HttpStatus.CREATED,
        'sale created successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['authorize', 'paginated'], {
    type: GetSalesDto,
    message: 'Sales retrieved successfully',
  })
  @Get()
  async getSales(
    @Query() query: GetSalesPaginationDto,
    @GetUser() user: IUserPayload,
  ) {
    try {
      const response = await this.salesService.fetchAll(query, user);
      return new ApiSuccessResponseDto(
        response,
        HttpStatus.OK,
        'Sales retrieved successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['authorize', 'successNull', 'notfound'], {
    message: 'Sale updated successfully',
  })
  @Patch('/:id')
  async updateSale(@Body() dto: UpdateSalesDto, @Param('id') id: string) {
    try {
      await this.salesService.update(id, dto);
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Sale updated successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['authorize', 'success', 'notfound'], {
    type: GetSaleDto,
    message: 'Sale fetched successfully',
  })
  @Get('/:id')
  async getSale(@Param('id') id: string) {
    try {
      const response = await this.salesService.fetchOne(id);
      return new ApiSuccessResponseDto(
        response,
        HttpStatus.OK,
        'Sale retrieved successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['authorize', 'successNull', 'notfound'], {
    message: 'Sale deleted successfully',
  })
  @Delete('/:id')
  async deleteSale(@Param('id') id: string) {
    try {
      await this.salesService.removeOne(id);
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Sale updated successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }
}

/*
{
  "data": {
    "id": "d141d29d-510c-4500-93a0-c669df9caf8d",
    "createdAt": "2025-01-02T14:44:32.782Z",
    "updatedAt": "2025-01-02T14:44:32.782Z",
    "saleNumber": "S-1735829072781",
    "paymentType": "CASH",
    "saleItems": [
      {
        "item": {
          "name": "Analgesics Item 1",
          "brandName": "Brand Analgesics 1",
          "sellingPrice": 87.01
        },
        "batchId": "e0ef0214-d468-49a8-8f6e-453912da751b",
        "quantity": 2,
        "batchNumber": "BATCH211e1"
      }
    ],
    "subTotal": 174.02,
    "total": 174.02,
    "notes": "To be refilled next month",
    "status": "PAID",
    "departmentId": null,
    "facilityId": "34a7159b-94bc-40c3-a710-3aba911e9289",
    "patient": null
  },
  "statusCode": 200,
  "message": "Sale retrieved successfully"
}
*/
