import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuditsService } from './audit.service';
import { CreateAuditDto } from './dto/create.dto';
import { UpdateAuditDto } from './dto/update.dto';

@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  create(@Body() dto: CreateAuditDto) {
    return this.auditsService.create(dto);
  }

  @Get()
  findAll() {
    return this.auditsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAuditDto) {
    return this.auditsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditsService.remove(id);
  }
}
