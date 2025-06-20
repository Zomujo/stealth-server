import { Module } from '@nestjs/common';
import { AuditsService } from './audit.service';
import { AuditsController } from './audit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditModels } from './models';

@Module({
  imports: [SequelizeModule.forFeature(AuditModels)],
  controllers: [AuditsController],
  providers: [AuditsService],
})
export class AuditsModule {}
