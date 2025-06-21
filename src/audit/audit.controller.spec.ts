import { Test, TestingModule } from '@nestjs/testing';
import { AuditsController } from './audit.controller';
import { AuditsService } from './audit.service';

describe('AuditsController', () => {
  let controller: AuditsController;
  let service: AuditsService;
  const mockAuditsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditsController],
      providers: [{ provide: AuditsService, useValue: mockAuditsService }],
    }).compile();

    controller = module.get<AuditsController>(AuditsController);
    service = module.get<AuditsService>(AuditsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
