import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators/default.response.decorators';
import { CreateSupplierDto, GetSupplierDto, SupplierResponse, UpdateSupplierDto } from './dto';
import { DrugResponse } from '../drugs/dto';

@ApiTags("Suppliers")
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) { }

  @CustomApiResponse(["created", "forbidden", "unauthorized"], { type: SupplierResponse, message: "Supplier created successfully" })
  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return await this.suppliersService.create(createSupplierDto);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], { type: SupplierResponse, isArray: true, message: "Suppliers retrieved successfully" })
  @Get()
  async findAll(@Query() query: GetSupplierDto) {
    return await this.suppliersService.findAll(query);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized", "notfound"], { type: SupplierResponse, message: "Supplier retrieved successfully" })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.suppliersService.findOne(id);
  }

  @CustomApiResponse(["patch", "forbidden", "unauthorized"], { type: String, message: "Supplier updated successfully" })
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return await this.suppliersService.update(id, updateSupplierDto);
  }

  @CustomApiResponse(["accepted", "forbidden", 'unauthorized'], { type: String, message: "Supplier deleted successfully" })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.suppliersService.remove(id);
  }
}
