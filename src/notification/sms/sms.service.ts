import { Injectable } from '@nestjs/common';
import { CreateSmsDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class SmsService {
  constructor(
    private configService: ConfigService,
    private twilioService: TwilioService,
  ) {}
  create(_createSmDto: CreateSmsDto) {
    return 'This action adds a new sm';
  }

  async sendSms(dto: CreateSmsDto) {
    const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');
    return this.twilioService.client.messages.create({
      body: dto.body,
      from: from,
      to: dto.to,
    });
  }

  findAll() {
    return `This action returns all sms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sm`;
  }
}
