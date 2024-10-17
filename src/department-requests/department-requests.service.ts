import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateDepartmentRequestDto,
  UpdateDepartmentRequestDto,
} from './dto/create.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DepartmentRequest } from './models/department-requests.model';
import { DrugsService } from 'src/inventory/drugs/drugs.service';
import { DepartmentService } from 'src/admin/department/department.service';
import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import { PaginatedDataResponseDto } from 'src/utils/responses/success.response';
import { GetDepartmentRequestDto } from './dto/';

@Injectable()
export class DepartmentRequestsService {
  constructor(
    @InjectModel(DepartmentRequest)
    private requestRepository: typeof DepartmentRequest,

    private drugService: DrugsService,
    private departmentService: DepartmentService,
  ) {}

  async create(dto: CreateDepartmentRequestDto, departmentId: string) {
    await this.departmentService.findOne(departmentId);
    await this.drugService.findOne(+dto.drugId);

    dto.requestNumber = `R-${new Date().getTime()}`;
    dto.status = 'PENDING';

    const result = await this.requestRepository.create({
      ...dto,
      departmentId,
    });

    return result;
  }

  async fetchAll(query: PaginationRequestDto, departmentId: string) {
    await this.departmentService.findOne(departmentId);

    const requests = await this.requestRepository.findAll({
      where: { departmentId },
    });

    const response = new PaginatedDataResponseDto<GetDepartmentRequestDto[]>(
      requests,
      query.page || 1,
      query.pageSize,
      requests.length,
    );

    return response;
  }

  async update(id: string, dto: UpdateDepartmentRequestDto) {
    const [rowsUpdated] = await this.requestRepository.update(
      { ...dto },
      {
        where: { id },
      },
    );

    if (rowsUpdated == 0) {
      throw new NotFoundException(`Report not found`);
    }

    return this.fetchOne(id);
  }

  async fetchOne(id: string) {
    const request = await this.requestRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request not found`);
    }

    return request;
  }
}
