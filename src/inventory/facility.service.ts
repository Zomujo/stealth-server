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
import { Facility } from './models/inventory.model';
import { CreateFacilityDto, FacilityResponse, UpdateFacilityDto } from './dto';

@Injectable()
export class FacilityService {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Facility)
    private readonly facilityRepo: typeof Facility,
  ) {
    this.logger = new Logger(FacilityService.name);
  }

  /**
   * Creates a new facility.
   *
   * @param createFacilityDto - The DTO containing the data for creating a facility.
   * @returns A promise that resolves to the created facility.
   * @throws {BadRequestException} If there is a unique constraint error.
   * @throws {InternalServerErrorException} If there is an internal server error.
   */
  async create(
    createFacilityDto: CreateFacilityDto,
  ): Promise<ApiSuccessResponseDto<FacilityResponse>> {
    try {
      const facility = await this.facilityRepo.create({
        ...createFacilityDto,
      });
      this.logger.log(`Created facility with ID: ${facility.id}`);
      return new ApiSuccessResponseDto(
        facility,
        HttpStatus.CREATED,
        'Facility created successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Retrieves all facilities.
   *
   * @param limit - The maximum number of categories to retrieve.
   * @returns A promise that resolves to an array of FacilityResponse objects.
   * @throws {InternalServerErrorException} if an error occurs while retrieving the categories.
   */
  async findAll(
    query: PaginationRequestDto,
  ): Promise<
    ApiSuccessResponseDto<PaginatedDataResponseDto<FacilityResponse[]>>
  > {
    try {
      const filter: FindAndCountOptions<Facility> = {
        where:
          (query.search && { name: { [Op.iLike]: `%${query.search}%` } }) || {},
        limit: query.pageSize || 10,
        offset: query.pageSize * (query.page - 1) || 0,
        order: query.orderBy && [[query.orderBy, 'ASC']],
      };
      const facilities = await this.facilityRepo.findAndCountAll(filter);

      this.logger.log(`Retrieved ${facilities.count} facilities`);
      return new ApiSuccessResponseDto(
        new PaginatedDataResponseDto(
          facilities.rows,
          query.page || 1,
          query.pageSize,
          facilities.count,
        ),
        HttpStatus.FOUND,
        'Facilities retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Finds a facility by its ID.
   *
   * @param id - The ID of the facility to find.
   * @returns A promise that resolves to the found facility.
   * @throws {NotFoundException} If the facility with the given ID is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  async findOne(id: string): Promise<ApiSuccessResponseDto<FacilityResponse>> {
    try {
      this.logger.log(`Finding facility with ID: ${id}`);
      const facility = await this.facilityRepo.findByPk(id, {
        include: [{ all: true }],
      });

      if (!facility) {
        this.logger.warn('Facility not found');
        throw new NotFoundException(`Facility with id: ${id} not found`);
      }
      this.logger.log(`Found facility with ID: ${id}`);
      return new ApiSuccessResponseDto(
        facility,
        HttpStatus.FOUND,
        'Facility retrieved successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Updates a facility.
   *
   * @param id - The ID of the facility.
   * @param updateFacilityDto - The DTO containing the updated facility data.
   * @returns A Promise that resolves to the updated facility.
   * @throws InternalServerErrorException if an error occurs during the update process.
   */
  async update(
    id: string,
    updateFacilityDto: UpdateFacilityDto,
  ): Promise<ApiSuccessResponseNoData> {
    try {
      const result = await this.facilityRepo.update(
        { ...updateFacilityDto },
        { where: { id } },
      );
      const affected = result[0];
      if (affected == 0) {
        this.logger.warn(`Facility with id ${id} not found`);
        throw new NotFoundException(`Facility with id ${id} not found`);
      }
      this.logger.log(`Updated facility with ID: ${id}`);
      return new ApiSuccessResponseNoData(
        HttpStatus.ACCEPTED,
        'Facility updated successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  /**
   * Removes a facility by its ID.
   *
   * @param id - The ID of the facility to remove.
   * @returns A promise that resolves to the result of the removal operation.
   * @throws {InternalServerErrorException} If an error occurs during the removal operation.
   */
  async remove(id: string): Promise<ApiSuccessResponseNoData> {
    try {
      this.logger.log(`Removing facility with ID: ${id}`);
      const res = await this.facilityRepo.destroy({ where: { id: id } });

      if (res == 0) {
        this.logger.warn(`Facility with id ${id} not found`);
        throw new NotFoundException(`Facility with id ${id} not found`);
      }
      return new ApiSuccessResponseNoData(
        HttpStatus.ACCEPTED,
        'Facility deleted successfully',
      );
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }
}
