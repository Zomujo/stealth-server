import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Facility } from './models/facility.model';
import { FacilityExistsRule } from '../../core/shared/validators';

@Module({
  imports: [SequelizeModule.forFeature([Facility])],
  providers: [FacilityService, FacilityExistsRule],
  controllers: [FacilityController],
  exports: [FacilityService],
})
export class FacilityModule {}
