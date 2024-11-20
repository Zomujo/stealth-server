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
import {
  ApiSuccessResponseDto,
  PaginatedDataResponseDto,
} from '../utils/responses/success.response';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateDrugOrderDto, CreateDrugOrderDto, GetOrdersDto } from './dto';
import { DrugOrdersService } from './orders.service';
import { DrugOrder } from './models/drugOrder.model';
import { Authorize, Permission } from 'src/auth/decorator';
import { CustomApiResponse } from 'src/shared/docs/decorators';
import { throwError } from '../utils/responses/error.response';
import { Features, PermissionLevel } from '../shared/enums/permissions.enum';

@ApiTags('Drug Orders')
@Controller('drug-orders')
@ApiBearerAuth('access-token')
@Authorize()
export class DrugOrdersController {
  private readonly logger = new Logger(DrugOrdersController.name);
  constructor(private readonly orderService: DrugOrdersService) {}

  @ApiOperation({ summary: 'Create a new drug order' })
  @CustomApiResponse(['authorize', 'success'], {
    type: DrugOrder,
    message: 'Drug order created successfully',
  })
  @Permission(Features.DRUG_ORDERS, PermissionLevel.READ_WRITE)
  @Post()
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

  @ApiOperation({ summary: 'Retrieve multiple drug orders' })
  @CustomApiResponse(['paginated', 'authorize'], {
    type: DrugOrder,
    message: 'Multiple drug orders retrieved successfully',
  })
  @Permission(Features.DRUG_ORDERS, PermissionLevel.READ)
  @Get()
  async getDrugOrders(
    @Query() query: GetOrdersDto,
  ): Promise<ApiSuccessResponseDto<PaginatedDataResponseDto<DrugOrder[]>>> {
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

  @ApiOperation({ summary: 'Get a specific drug order by ID' })
  @CustomApiResponse(['success', 'notfound', 'authorize'], {
    type: DrugOrder,
    message: 'Drug order retrieved successfully',
  })
  @Permission(Features.DRUG_ORDERS, PermissionLevel.READ)
  @Get(':id')
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

  @ApiOperation({ summary: 'Update a drug order by ID' })
  @CustomApiResponse(['success', 'notfound', 'authorize'], {
    type: DrugOrder,
    message: 'Drug order updated successfully',
  })
  @Permission(Features.DRUG_ORDERS, PermissionLevel.READ_WRITE)
  @Patch(':id')
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

  @ApiOperation({ summary: 'Delete a drug order by ID' })
  @CustomApiResponse(['success', 'notfound', 'authorize'], {
    type: DrugOrder,
    message: 'Multiple drug orders retrieved successfully',
  })
  @Permission(Features.DRUG_ORDERS, PermissionLevel.READ_WRITE_DELETE)
  @Delete(':id')
  async deleteDrugOrder(@Param('id') id: string) {
    try {
      const msg = await this.orderService.deleteDrugOrder(id);
      return new ApiSuccessResponseDto(
        msg,
        HttpStatus.OK,
        'Drug order deleted successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }
}
