import { Injectable } from '@nestjs/common';
import { CreateSmsDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';
import AfricasTalking from 'africastalking';
import { SMSMessageData } from './types';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

@Injectable()
export class SmsService {
  constructor(
    private configService: ConfigService,
    private twilioService: TwilioService,
  ) {}
  create(_createSmDto: CreateSmsDto) {
    return 'This action adds a new sm';
  }

  private get africastalkingClient() {
    return AfricasTalking({
      apiKey: this.configService.get<string>('ATSK_API_KEY'),
      username: this.configService.get<string>('ATSK_USERNAME'),
    });
  }

  async sendSms(dto: CreateSmsDto) {
    return await this.sendWithAfricasTalking({
      body: dto.body,
      to: dto.to,
    });
    // return this.twilioService.client.messages.create();
  }

  async sendWithAfricasTalking(dto: CreateSmsDto): Promise<SMSMessageData> {
    const from = this.configService.get<string>('ATSK_SHORT_CODE');
    return this.africastalkingClient.SMS.send({
      to: dto.to,
      from: from,
      message: dto.body,
    });
  }
  async sendWithTwilio(dto: CreateSmsDto): Promise<MessageInstance> {
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
