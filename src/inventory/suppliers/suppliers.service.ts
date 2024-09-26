import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Supplier } from './models/supplier.model';
import { CreateSupplierDto, GetSupplierDto, UpdateSupplierDto } from './dto';
import { throwError } from 'src/utils/responses/error.response';

@Injectable()
export class SuppliersService {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Supplier) private readonly supplierRepo: typeof Supplier
  ) { this.logger = new Logger(SuppliersService.name); }
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const created = await this.supplierRepo.create({ ...createSupplierDto });
      return created;
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  async findAll(query: GetSupplierDto): Promise<Supplier[]> {
    try {
      const found = await this.supplierRepo.findAll()
      this.logger.log(`retrieved ${found.length} suppliers`)
      return found
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  async findOne(id: string): Promise<Supplier> {
    try {
      const found = await this.supplierRepo.findByPk(id);
      if (!found) {
        throw new NotFoundException(`Supplier with id ${id} not found`);
      }
      return found;
    } catch (error) {
      throw throwError(this.logger, error);
    }
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: string) {
    return `This action removes a #${id} supplier`;
  }
}
