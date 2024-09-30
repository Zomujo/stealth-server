import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  PaginatedDataResponseDto,
} from 'src/utils/responses/success.response';
import { throwError } from 'src/utils/responses/error.response';
import { PaginationRequestDto } from 'src/shared/docs/dto/pagination.dto';
import { FindAndCountOptions, Op } from 'sequelize';
import { Department } from './models/inventory.model';
import {
  CreateDepartmentDto,
  DepartmentResponse,
  UpdateDepartmentDto,
} from './dto';

@Injectable()
export class DepartmentService {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Department)
    private readonly departmentRepo: typeof Department,
  ) {
    this.logger = new Logger(DepartmentService.name);
  }

  /**
   * Creates a new department.
   *
   * @param createDepartmentDto - The DTO containing the data for creating a department.
   * @returns A promise that resolves to the created department.
   * @throws {BadRequestException} If there is a unique constraint error.
   * @throws {InternalServerErrorException} If there is an internal server error.
   */
  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<ApiSuccessResponseDto<DepartmentResponse>> {
    try {
      const department = await this.departmentRepo.create({
        ...createDepartmentDto,
      });
      this.logger.log(`Created department with ID: ${department.id}`);
      return new ApiSuccessResponseDto(
        department,
        HttpStatus.CREATED,
        'Department created successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Retrieves all departments.
   *
   * @param limit - The maximum number of categories to retrieve.
   * @returns A promise that resolves to an array of DepartmentResponse objects.
   * @throws {InternalServerErrorException} if an error occurs while retrieving the categories.
   */
  async findAll(
    query: PaginationRequestDto,
  ): Promise<
    ApiSuccessResponseDto<PaginatedDataResponseDto<DepartmentResponse[]>>
  > {
    try {
      const filter: FindAndCountOptions<Department> = {
        where:
          (query.search && { name: { [Op.iLike]: `%${query.search}%` } }) || {},
        limit: query.pageSize || 10,
        offset: query.pageSize * (query.page - 1) || 0,
        order: query.orderBy && [[query.orderBy, 'ASC']],
      };
      const departments = await this.departmentRepo.findAndCountAll(filter);

      this.logger.log(`Retrieved ${departments.count} departments`);
      return new ApiSuccessResponseDto(
        new PaginatedDataResponseDto(
          departments.rows,
          query.page || 1,
          query.pageSize,
          departments.count,
        ),
        HttpStatus.FOUND,
        'Departments retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Finds a department by its ID.
   *
   * @param id - The ID of the department to find.
   * @returns A promise that resolves to the found department.
   * @throws {NotFoundException} If the department with the given ID is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  async findOne(
    id: string,
  ): Promise<ApiSuccessResponseDto<DepartmentResponse>> {
    try {
      this.logger.log(`Finding department with ID: ${id}`);
      const department = await this.departmentRepo.findByPk(id, {
        include: [{ all: true }],
      });

      if (!department) {
        this.logger.warn('Department not found');
        throw new NotFoundException(`Department with id: ${id} not found`);
      }
      this.logger.log(`Found department with ID: ${id}`);
      return new ApiSuccessResponseDto(
        department,
        HttpStatus.FOUND,
        'Department retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Updates a department.
   *
   * @param id - The ID of the department.
   * @param updateDepartmentDto - The DTO containing the updated department data.
   * @returns A Promise that resolves to the updated department.
   * @throws InternalServerErrorException if an error occurs during the update process.
   */
  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<ApiSuccessResponseNoData> {
    try {
      const result = await this.departmentRepo.update(
        { ...updateDepartmentDto },
        { where: { id } },
      );
      const affected = result[0];
      if (affected == 0) {
        this.logger.warn(`Department with id ${id} not found`);
        throw new NotFoundException(`Department with id ${id} not found`);
      }
      this.logger.log(`Updated department with ID: ${id}`);
      return new ApiSuccessResponseNoData(
        HttpStatus.ACCEPTED,
        'Department updated successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Removes a department by its ID.
   *
   * @param id - The ID of the department to remove.
   * @returns A promise that resolves to the result of the removal operation.
   * @throws {InternalServerErrorException} If an error occurs during the removal operation.
   */
  async remove(id: string): Promise<ApiSuccessResponseNoData> {
    try {
      this.logger.log(`Removing department with ID: ${id}`);
      const res = await this.departmentRepo.destroy({ where: { id: id } });

      if (res == 0) {
        this.logger.warn(`Department with id ${id} not found`);
        throw new NotFoundException(`Department with id ${id} not found`);
      }
      return new ApiSuccessResponseNoData(
        HttpStatus.ACCEPTED,
        'Department deleted successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }
}
