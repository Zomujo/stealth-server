import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateDrugsCategoryDto } from './dto/update-drugs-category.dto';
import { DrugsCategory, DrugsCategoryStatus } from './models/drugs-category.model';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeScopeError, UniqueConstraintError, UnknownConstraintError } from 'sequelize';
import { error } from 'console';
import { CreateDrugsCategoryDto, DrugsCategoryResponse, GetDrugsCategoryDto } from './dto';

@Injectable()
export class DrugsCategoryService {
  private readonly logger: Logger;
  constructor(
    @InjectModel(DrugsCategory)
    private readonly drugCategoryRepo: typeof DrugsCategory) {
    this.logger = new Logger(DrugsCategoryService.name);
  }

  /**
   * Creates a new drugs category.
   *
   * @param createDrugsCategoryDto - The DTO containing the data for creating a drugs category.
   * @returns A promise that resolves to the created drugs category.
   * @throws {BadRequestException} If there is a unique constraint error.
   * @throws {InternalServerErrorException} If there is an internal server error.
   */
  async create(createDrugsCategoryDto: CreateDrugsCategoryDto): Promise<DrugsCategoryResponse> {
    try {
      const category = await this.drugCategoryRepo.create({
        ...createDrugsCategoryDto,
      })
      return category
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UniqueConstraintError) {
        let eMessage = `${error.errors[0].path}: ${error.errors[0].message}`;
        throw new BadRequestException(eMessage, error.name)
      }
      throw new InternalServerErrorException(error.message, error)
    }
  }

  /**
   * Retrieves all drugs categories.
   *
   * @param limit - The maximum number of categories to retrieve.
   * @returns A promise that resolves to an array of DrugsCategoryResponse objects.
   * @throws InternalServerErrorException if an error occurs while retrieving the categories.
   */
  async findAll(query: GetDrugsCategoryDto): Promise<DrugsCategoryResponse[]> {
    try {
      this.logger.log(query.limit)
      const categories = await this.drugCategoryRepo.findAll({
        limit: query.limit,
      });
      return categories
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message, error)
    }
  }

  /**
   * Finds a drugs category by its ID.
   *
   * @param id - The ID of the drugs category to find.
   * @returns A promise that resolves to the found drugs category.
   * @throws {NotFoundException} If the drugs category with the given ID is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  async findOne(id: string): Promise<DrugsCategoryResponse> {
    try {
      const category = await this.drugCategoryRepo.findByPk(id);

      if (!category) {
        this.logger.warn("Category not found");
        throw new NotFoundException(`Category with id: ${id} not found`);
      }
      return category
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message, error)
    }
  }

  /**
   * Updates a drugs category.
   *
   * @param id - The ID of the drugs category.
   * @param updateDrugsCategoryDto - The DTO containing the updated drugs category data.
   * @returns A Promise that resolves to the updated drugs category.
   * @throws InternalServerErrorException if an error occurs during the update process.
   */
  async update(id: string, updateDrugsCategoryDto: UpdateDrugsCategoryDto) {
    try {
      const category = await this.drugCategoryRepo.upsert({ id: id, ...updateDrugsCategoryDto })
      this.logger.log(`Drug category with id: ${id} updated successfully`)
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message, error)
    }
  }

  /**
   * Removes a drug category by its ID.
   *
   * @param id - The ID of the drug category to remove.
   * @returns A promise that resolves to the result of the removal operation.
   * @throws {InternalServerErrorException} If an error occurs during the removal operation.
   */
  async remove(id: number) {
    try {
      return await this.drugCategoryRepo.destroy({ where: { id: id } })
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message, error);
    }
  }
}
