import { Test, TestingModule } from '@nestjs/testing';
import { ImsStockmateController } from './ims-stockmate.controller';
import { ImsStockmateService } from './ims-stockmate.service';

describe('ImsStockmateController', () => {
  let controller: ImsStockmateController;
  let service: ImsStockmateService;

  const mockStockmateService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImsStockmateController],
      providers: [
        {
          provide: ImsStockmateService,
          useValue: mockStockmateService,
        },
      ],
    }).compile();

    controller = module.get<ImsStockmateController>(ImsStockmateController);
    service = module.get<ImsStockmateService>(ImsStockmateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
