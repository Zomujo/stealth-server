import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { MailModule } from '../notification/mail/mail.module';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComplaintsModels } from './models';

@Module({
  imports: [
    MailModule,
    UserModule,
    SequelizeModule.forFeature(ComplaintsModels),
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}
