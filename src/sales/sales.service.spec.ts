import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { Sale } from './models/sales.model';
import { getModelToken } from '@nestjs/sequelize';
import { BatchService } from '../inventory/items/batches/batch.service';
import { PatientService } from '../patient/patient.service';
import { SaleItem } from './models/sale-items.model';
import { Sequelize } from 'sequelize-typescript';

describe('SalesService', () => {
  let service: SalesService;
  let batchService: BatchService;
  let patientService: PatientService;
  let model: typeof Sale;
  const mockSaleModel = {};
  const mockSaleItemModel = {};
  const mockSequelize = {};
  const mockBatchService = {};
  const mockPatientService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        { provide: getModelToken(Sale), useValue: mockSaleModel },
        { provide: getModelToken(SaleItem), useValue: mockSaleItemModel },
        { provide: Sequelize, useValue: mockSequelize },
        { provide: BatchService, useValue: mockBatchService },
        { provide: PatientService, useValue: mockPatientService },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
    batchService = module.get<BatchService>(BatchService);
    patientService = module.get<PatientService>(PatientService);
    model = module.get<typeof Sale>(getModelToken(Sale));
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
    expect(service).toBeDefined();
    expect(batchService).toBeDefined();
    expect(patientService).toBeDefined();
  });
});
