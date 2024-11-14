import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators/default.response.decorators';
import {
  CreateSupplierDto,
  GetSuppliersResponse,
  SupplierResponse,
  UpdateSupplierDto,
} from './dto';
import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  PaginatedDataResponseDto,
} from 'src/utils/responses/success.response';
import { throwError } from 'src/utils/responses/error.response';
import { StatusType } from './models/supplier.model';
import { Role } from '../../auth/interface/roles.enum';
import { Roles } from '../../auth/decorator';
import { DeleteItemsDto } from '../../shared/docs/dto/delete.dto';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  private readonly logger: Logger;
  constructor(private readonly suppliersService: SuppliersService) {
    this.logger = new Logger(SuppliersController.name);
  }

  @CustomApiResponse(['created', 'authorize'], {
    type: SupplierResponse,
    message: 'Supplier created successfully',
  })
  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    try {
      const supplier = await this.suppliersService.create(createSupplierDto);
      return new ApiSuccessResponseDto(
        supplier,
        HttpStatus.CREATED,
        `Supplier created successfully`,
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['paginated', 'authorize'], {
    type: GetSuppliersResponse,
    isArray: true,
    message: 'Suppliers retrieved successfully',
  })
  @Get()
  async findAll(@Query() query: PaginationRequestDto) {
    try {
      const suppliers = await this.suppliersService.findAll(query);
      return new ApiSuccessResponseDto(
        new PaginatedDataResponseDto(
          suppliers[0],
          query.page || 1,
          query.pageSize,
          suppliers[1],
        ),
        HttpStatus.OK,
        'Suppliers retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['success', 'authorize', 'notfound'], {
    type: SupplierResponse,
    message: 'Supplier retrieved successfully',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const supplier = await this.suppliersService.findOne(id);
      return new ApiSuccessResponseDto(
        supplier,
        HttpStatus.OK,
        'supplier retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['successNull', 'authorize'], {
    message: 'Supplier updated successfully',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    try {
      await this.suppliersService.update(id, updateSupplierDto);
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'supplier updated successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['successNull', 'authorize'], {
    message: 'Supplier deactivated successfully',
  })
  @Roles(Role.HospitalAdmin)
  @Patch(':id/deactivate')
  async deactivateSupplier(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.suppliersService.changeStatus(id, StatusType.DEACTIVATED);
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Supplier deactivated successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['successNull', 'authorize'], {
    message: 'Supplier activated successfully',
  })
  @Roles(Role.HospitalAdmin)
  @Patch(':id/activate')
  async activateSupplier(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.suppliersService.changeStatus(id, StatusType.ACTIVE);
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Supplier activated successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['successNull', 'authorize'], {
    message: 'Supplier deleted successfully',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.suppliersService.remove(id);
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Supplier deleted successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['successNull', 'authorize'], {
    message: 'Suppliers deleted successfully',
  })
  @Delete()
  async removeBulk(@Body() dto: DeleteItemsDto) {
    try {
      await this.suppliersService.removeBulk(dto.ids);
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Suppliers deleted successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }
}
