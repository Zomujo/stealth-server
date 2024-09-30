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
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators/default.response.decorators';
import { GetQueries } from 'src/shared/docs/decorators/get-queries.decorator';
import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/interface/roles.enum';
import { FacilityService } from './facility.service';
import {
  CreateDepartmentDto,
  CreateFacilityDto,
  DepartmentResponse,
  FacilityResponse,
  UpdateDepartmentDto,
  UpdateFacilityDto,
} from './dto';
import { DepartmentService } from './department.service';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  private readonly logger: Logger;
  constructor(
    private readonly facilityService: FacilityService,
    private readonly departmentService: DepartmentService,
  ) {
    this.logger = new Logger(InventoryController.name);
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: FacilityResponse,
    message: 'Facility created successfully',
  })
  @Roles(Role.HospitalAdmin, Role.NationalAdmin, Role.RegionalAdmin)
  @Post('/facilities')
  async createFacility(@Body() createFacilityDto: CreateFacilityDto) {
    return await this.facilityService.create(createFacilityDto);
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: DepartmentResponse,
    message: 'Department created successfully',
  })
  @Roles(Role.HospitalAdmin, Role.NationalAdmin, Role.RegionalAdmin)
  @Post('/departments')
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentService.create(createDepartmentDto);
  }

  @CustomApiResponse(['filter', 'authorize'], {
    type: FacilityResponse,
    message: 'Facilities retrieved successfully',
  })
  @Get('/facilities')
  async findFacilities(@GetQueries() query?: PaginationRequestDto) {
    return await this.facilityService.findAll(query);
  }

  @CustomApiResponse(['filter', 'authorize'], {
    type: DepartmentResponse,
    message: 'Departments retrieved successfully',
  })
  @Get('/departments')
  async findDepartments(@GetQueries() query?: PaginationRequestDto) {
    return await this.departmentService.findAll(query);
  }

  @CustomApiResponse(['success', 'authorize', 'notfound'], {
    type: FacilityResponse,
    message: 'Facility retrieved successfully',
  })
  @Get('/facilities/:id')
  async findFacility(@Param('id', ParseUUIDPipe) id: string) {
    return await this.facilityService.findOne(id);
  }

  @CustomApiResponse(['success', 'authorize', 'notfound'], {
    type: DepartmentResponse,
    message: 'Department retrieved successfully',
  })
  @Get('/departments/:id')
  async findDepartment(@Param('id', ParseUUIDPipe) id: string) {
    return await this.departmentService.findOne(id);
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: String,
    message: 'Facility updated successfully',
  })
  @Patch('/facilities/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFacilityDto,
  ) {
    return await this.facilityService.update(id, dto);
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: String,
    message: 'Department updated successfully',
  })
  @Patch('/departments/:id')
  async updateDepartment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return await this.departmentService.update(id, dto);
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: String,
    message: 'Facility deleted successfully',
  })
  @Delete('/facilities/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.facilityService.remove(id);
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: String,
    message: 'Department deleted successfully',
  })
  @Delete('/departments/:id')
  async removeDepartment(@Param('id', ParseUUIDPipe) id: string) {
    return await this.departmentService.remove(id);
  }
}
