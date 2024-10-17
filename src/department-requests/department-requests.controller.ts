import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Logger,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { DepartmentRequestsService } from './department-requests.service';
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
} from './dto/create.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from 'src/shared/docs/decorators';
import { ApiSuccessResponseDto } from 'src/utils/responses/success.response';
import { throwError } from 'src/utils/responses/error.response';
import { GetDepartmentRequestDto } from './dto/';
import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/interface/roles.enum';

@ApiTags('Department Requests')
@Controller('department-requests')
@Roles(Role.HospitalAdmin)
export class DepartmentRequestsController {
  private logger = new Logger(DepartmentRequestsController.name);

  constructor(
    private readonly departmentRequestsService: DepartmentRequestsService,
  ) {}

  @CustomApiResponse(['success', 'authorize'], {
    type: CreateDepartmentRequestDto,
    message: 'Request created successfully',
  })
  @Post()
  async create(
    @Body() createDepartmentRequestDto: CreateDepartmentRequestDto,

    @GetUser('department') departmentId: string,
  ) {
    try {
      const response = await this.departmentRequestsService.create(
        createDepartmentRequestDto,
        departmentId,
      );

      return new ApiSuccessResponseDto(
        response,
        HttpStatus.CREATED,
        'Request created successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['authorize', 'paginated'], {
    type: GetDepartmentRequestDto,
    message: 'Requests fetched successfully',
  })
  @Get()
  async getRequests(
    @Query() query: PaginationRequestDto,
    @GetUser('department') departmentId: string,
  ) {
    try {
      const response = await this.departmentRequestsService.fetchAll(
        query,
        departmentId,
      );

      return new ApiSuccessResponseDto(
        response,
        HttpStatus.OK,
        'Requests fetched successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: GetDepartmentRequestDto,
    message: 'Request updated successfully',
  })
  @Patch(':id')
  async updateRequest(
    @Body() data: UpdateDepartmentRequestDto,
    @Param() id: string,
  ) {
    try {
      const response = await this.departmentRequestsService.update(id, data);

      return new ApiSuccessResponseDto(
        response,
        HttpStatus.OK,
        'Request updated successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: GetDepartmentRequestDto,
    message: 'Request fetched successfully',
  })
  @Get(':id')
  async getRequest(@Param() id: string) {
    try {
      const response = await this.departmentRequestsService.fetchOne(id);

      return new ApiSuccessResponseDto(
        response,
        HttpStatus.OK,
        'Request fetched successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }
}
