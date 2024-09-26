import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { ApiTags, PickType } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators/default.response.decorators';
import { CreateDrugDto, DrugResponse, GetDrugDto, UpdateDrugDto } from './dto';

@ApiTags("Drugs")
@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @CustomApiResponse(["created", "forbidden", "unauthorized"], {type: DrugResponse, message: "Drug created successfully"})
  @Post()
  async create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugsService.create(createDrugDto);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], {type: DrugResponse, isArray: true, message: "Drugs retrieved successfully"})
  @Get()
  findAll(@Query() query: GetDrugDto) {
    return this.drugsService.findAll(query);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], {type: DrugResponse, message: "Drug retrieved successfully"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugsService.findOne(+id);
  }

  @CustomApiResponse(["patch", "forbidden", "unauthorized"], {type: String, message: "Drug updated successfully"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrugDto: UpdateDrugDto) {
    return this.drugsService.update(+id, updateDrugDto);
  }

  @CustomApiResponse(["accepted", "forbidden", "unauthorized"], {type: PickType<DrugResponse, 'id'>, message: "Drug deleted successfully"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drugsService.remove(+id);
  }
}
