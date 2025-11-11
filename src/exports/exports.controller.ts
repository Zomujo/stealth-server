import {
  Controller,
  Get,
  Param,
  Delete,
  StreamableFile,
  Logger,
  Query,
} from '@nestjs/common';
import { ExportsService } from './exports.service';
import { throwError } from '../core/shared/responses/error.response';
import { LocationQueryDto } from './dto';

@Controller('exports')
export class ExportsController {
  private logger = new Logger(ExportsController.name);
  constructor(private readonly exportsService: ExportsService) {}

  @Get()
  async getFileUsingStaticValues() {
    try {
      const response = await this.exportsService.exportStockCsv('ji');
      return new StreamableFile(response, {
        type: 'text/csv',
        disposition: 'attachment; filename="test.csv"',
      });
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @Get('performance')
  async findAll(@Query() query: LocationQueryDto) {
    try {
      const response =
        await this.exportsService.exportLocationPerformanceData(query);

      return new StreamableFile(response.file, {
        type: 'application/pdf',
        disposition: `attachment; filename=${response.fileName}`,
      });
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateExportDto) {
  //   return this.exportsService.update(id, dto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportsService.remove(id);
  }
}
