import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { DrugResponse, GetDrugDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Drug } from './models/drug.model';
import { UniqueConstraintError } from 'sequelize';
import { DrugsCategoryService } from '../drugs-category/drugs-category.service';
import { SuppliersService } from '../suppliers/suppliers.service';

@Injectable()
export class DrugsService {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Drug) private readonly drugRepo: typeof Drug,
    private readonly drugCategoryService: DrugsCategoryService,
    private readonly supplierService: SuppliersService,
  ) {
    this.logger = new Logger(DrugsService.name);
  }
  
  async create(createDrugDto: CreateDrugDto): Promise<DrugResponse> {
    try {
      // check if category exists
      this.logger.log(`checking drug category with id: ${createDrugDto.categoryId}`)
       await this.drugCategoryService.findOne(createDrugDto.categoryId);

      // check if supplier exists
      this.logger.log(`checking drug supplier with id: ${createDrugDto.supplierId}`)
      await this.supplierService.findOne(createDrugDto.supplierId);

      const createdDrug = await this.drugRepo.create({ ...createDrugDto });
      this.logger.log(`Drug added successfully. id: ${createdDrug.id}`)
      return createdDrug;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof UniqueConstraintError) {
        let err = error.errors[0];
        this.logger.warn(`${err.value} already exists`)
        throw new BadRequestException(`${err.path}: ${err.message}, ${err.value} already exists`, JSON.stringify(err))
      }
      throw new InternalServerErrorException(error.message, error);
    }
  }

  findAll(query: GetDrugDto) {
    return `This action returns all drugs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drug`;
  }

  update(id: number, updateDrugDto: UpdateDrugDto) {
    return `This action updates a #${id} drug`;
  }

  remove(id: number) {
    return `This action removes a #${id} drug`;
  }

  async getAnalytics() {
    return 'This action returns analytics for drugs';
  }
}
