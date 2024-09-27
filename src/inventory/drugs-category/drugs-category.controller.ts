import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { DrugsCategoryService } from './drugs-category.service';
import { CreateDrugsCategoryDto, DrugsCategoryResponse, GetDrugsCategoryDto, UpdateDrugsCategoryDto } from './dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators/default.response.decorators';
import { DrugsCategory } from './models/drugs-category.model';
import { GetQueries } from 'src/shared/docs/decorators/get-queries.decorator';

@ApiTags("Drug Category")
@Controller('drugsCategories')
export class DrugsCategoryController {
  private readonly logger: Logger;
  constructor(private readonly drugsCategoryService: DrugsCategoryService) {
    this.logger = new Logger(DrugsCategoryController.name);
  }

  @CustomApiResponse(["created", "forbidden", "unauthorized"], { type: DrugsCategoryResponse, message: "Drug category created successfully" })
  @Post()
  async create(@Body() createDrugsCategoryDto: CreateDrugsCategoryDto) {
    return await this.drugsCategoryService.create(createDrugsCategoryDto);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], { type: DrugsCategoryResponse, isArray: true, message: "Drug categories retrieved successfully" })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'order',example: 'name=ASC', required: false, type: String })
  @Get()
  async findAll(@GetQueries(GetDrugsCategoryDto) query: GetDrugsCategoryDto) {
    return await this.drugsCategoryService.findAll(query);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized", "notfound"], { type: DrugsCategoryResponse, message: "Drug category retrieved successfully" })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.drugsCategoryService.findOne(id);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], { type: String, message: "Drug category updated successfully" })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDrugsCategoryDto: UpdateDrugsCategoryDto,
  ) {
    return this.drugsCategoryService.update(id, updateDrugsCategoryDto);
  }

  @CustomApiResponse(["accepted", "forbidden", 'unauthorized'], { type: String, message: "Drug category deleted successfully" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drugsCategoryService.remove(+id);
  }
}
