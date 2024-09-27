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
import { GetQueries, QueryDocs } from 'src/shared/docs/decorators/get-queries.decorator';

@ApiTags("Drug Category")
@Controller('drugsCategories')
export class DrugsCategoryController {
  private readonly logger: Logger;
  constructor(private readonly drugsCategoryService: DrugsCategoryService) {
    this.logger = new Logger(DrugsCategoryController.name);
  }

  @CustomApiResponse(["created", "unauthorized"], { type: DrugsCategoryResponse, message: "Drug category created successfully" })
  @Post()
  async create(@Body() createDrugsCategoryDto: CreateDrugsCategoryDto) {
    return await this.drugsCategoryService.create(createDrugsCategoryDto);
  }

  @CustomApiResponse(["accepted", "unauthorized"], { type: DrugsCategoryResponse, isArray: true, message: "Drug categories retrieved successfully" })
  @QueryDocs(['limit', 'page', 'search'])
  @Get()
  async findAll(@GetQueries() query: GetDrugsCategoryDto) {
    return await this.drugsCategoryService.findAll(query);
  }

  @CustomApiResponse(["accepted", "unauthorized", "notfound"], { type: DrugsCategoryResponse, message: "Drug category retrieved successfully" })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.drugsCategoryService.findOne(id);
  }

  @CustomApiResponse(["accepted", "unauthorized"], { type: String, message: "Drug category updated successfully" })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDrugsCategoryDto: UpdateDrugsCategoryDto,
  ) {
    return  await this.drugsCategoryService.update(id, updateDrugsCategoryDto);
  }

  @CustomApiResponse(["accepted", 'unauthorized'], { type: String, message: "Drug category deleted successfully" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return  await this.drugsCategoryService.remove(+id);
  }
}
