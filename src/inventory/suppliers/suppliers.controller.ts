import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators/default.response.decorators';

@ApiTags("Suppliers")
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @CustomApiResponse(["created", "forbidden", "unauthorized"], {type: CreateSupplierDto, message: "Supplier created successfully"})
  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return await this.suppliersService.create(createSupplierDto);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], { type: CreateSupplierDto, isArray: true, message: "Suppliers retrieved successfully" })
  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized", "notfound"], {type: CreateSupplierDto, message: "Supplier retrieved successfully"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], { type: String, message: "Supplier updated successfully" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @CustomApiResponse(["accepted", "forbidden", 'unauthorized'], {type: String, message: "Supplier deleted successfully"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
