import { Module } from '@nestjs/common';
import { AuditsService } from './audit.service';
import { AuditsController } from './audit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditModels } from './models';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './interceptor/audit.interceptor';

@Module({
  imports: [SequelizeModule.forFeature(AuditModels)],
  controllers: [AuditsController],
  providers: [
    AuditsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AuditsModule {}
