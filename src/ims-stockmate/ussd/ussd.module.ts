import { Module } from '@nestjs/common';
import { StockmateUssdService } from './ussd.service';
import { StockmateUssdController } from './ussd.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockmateUssdSession } from './models/ussd.model';
import { User } from '../../auth/models/user.model';
import { InventoryModule } from '../../inventory/inventory.module';
import { Patient } from '../../patient/models/patient.model';
import { SalesModule } from '../../sales/sales.module';
import { SmsModule } from '../../notification/sms/sms.module';

@Module({
  imports: [
    SequelizeModule.forFeature([StockmateUssdSession, User, Patient]),
    InventoryModule,
    SalesModule,
    SmsModule,
  ],
  controllers: [StockmateUssdController],
  providers: [StockmateUssdService],
})
export class StockmateUssdModule {}
