import { Test, TestingModule } from '@nestjs/testing';
import { DrugsController } from './drugs.controller';
import { DrugsService } from './drugs.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/interface/jwt.config';
import { DrugsCategory } from '../drugs-category/models/drugs-category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Supplier } from '../suppliers/models/supplier.model';
import { Drug } from './models/drug.model';
import { DrugsCategoryService } from '../drugs-category/drugs-category.service';
import { SuppliersService } from '../suppliers/suppliers.service';
const DB_USER = 'postgres';
const DB_PASSWORD = 'postgres';
const DB_HOST = 'localhost';
const DB_PORT = 5432;
const DB_NAME = 'stealth_db';

describe('DrugsController', () => {
  let controller: DrugsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          password: DB_PASSWORD,
          username: DB_USER,
          host: DB_HOST,
          port: DB_PORT,
          database: DB_NAME,
          dialect: 'postgres',
          ssl: false,
          dialectOptions: {
            ssl: false,
          },
          logging: false,
          models: [DrugsCategory, Drug, Supplier],
        }),
        SequelizeModule.forFeature([DrugsCategory, Drug, Supplier]),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
      ],
      controllers: [DrugsController],
      providers: [DrugsService, DrugsCategoryService, SuppliersService],
    }).compile();

    controller = module.get<DrugsController>(DrugsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
