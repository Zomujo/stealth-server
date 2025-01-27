import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { MailModule } from '../notification/mail/mail.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MailModule, UserModule],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}
