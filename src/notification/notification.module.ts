import { Global, Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { NotificationService } from './notification.service';
import { NotificationsGateway } from './gateway/notification.gateway';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../auth/interface/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [NotificationsGateway, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
