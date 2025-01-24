import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { PatientExistsRule } from '../shared/validators';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  providers: [PatientService, PatientExistsRule],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
