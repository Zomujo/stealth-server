import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Logger,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiSuccessResponseDto } from '../utils/responses/success.response';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateDrugOrderDto, CreateDrugOrderDto, GetOrdersDto } from './dto';
import { DrugOrdersService } from './orders.service';
import { DrugOrder } from './models/drugOrder.model';
import { Authorize } from 'src/auth/decorator';
import { CustomApiResponse } from 'src/shared/docs/decorators';
import { throwError } from '../utils/responses/error.response';

@ApiTags('Drug Orders')
@Controller('drug-orders')
@ApiBearerAuth('access-token')
@Authorize()
export class DrugOrdersController {
  private readonly logger = new Logger(DrugOrdersController.name);
  constructor(private readonly orderService: DrugOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new drug order' })
  @CustomApiResponse(['created', 'unauthorized', 'forbidden'], {
    type: DrugOrder,
    message: 'Drug order created successfully',
  })
  async create(
    @Body() dto: CreateDrugOrderDto,
  ): Promise<ApiSuccessResponseDto<DrugOrder>> {
    try {
      const result = await this.orderService.createDrugOrder(dto);
      return new ApiSuccessResponseDto<DrugOrder>(
        result,
        HttpStatus.CREATED,
        'Drug order created successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve multiple drug orders' })
  @CustomApiResponse(['paginated', 'unauthorized', 'forbidden'], {
    type: DrugOrder,
    message: 'Multiple drug orders retrieved successfully',
  })
  async getDrugOrders(
    @Query() query: GetOrdersDto,
  ): Promise<ApiSuccessResponseDto<DrugOrder[]>> {
    try {
      const result = await this.orderService.findDrugOrders(query);
      return new ApiSuccessResponseDto(
        result,
        HttpStatus.OK,
        'Drug orders retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific drug order by ID' })
  @CustomApiResponse(['accepted', 'notfound', 'unauthorized', 'forbidden'], {
    type: DrugOrder,
    message: 'Drug order retrieved successfully',
  })
  async getDrugOrder(
    @Param('id') id: string,
  ): Promise<ApiSuccessResponseDto<DrugOrder>> {
    try {
      const result = await this.orderService.findDrugOrder(id);

      return new ApiSuccessResponseDto<DrugOrder>(
        result,
        HttpStatus.OK,
        'Drug order retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a drug order by ID' })
  @CustomApiResponse(['patch', 'notfound', 'unauthorized', 'forbidden'], {
    type: DrugOrder,
    message: 'Drug order updated successfully',
  })
  async updateDrugOrder(
    @Param('id') id: string,
    @Body() dto: UpdateDrugOrderDto,
  ): Promise<ApiSuccessResponseDto<DrugOrder>> {
    try {
      const result = await this.orderService.updateDrugOrder(id, dto);
      return new ApiSuccessResponseDto<DrugOrder>(
        result,
        HttpStatus.ACCEPTED,
        'Drug order updated successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a drug order by ID' })
  @CustomApiResponse(['notfound', 'unauthorized', 'forbidden'], {
    type: DrugOrder,
    message: 'Multiple drug orders retrieved successfully',
  })
  async deleteDrugOrder(@Param('id') id: string) {
    try {
      return await this.orderService.deleteDrugOrder(id);
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }
}
