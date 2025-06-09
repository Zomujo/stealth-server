import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ImsStockmateService } from './ims-stockmate.service';
import { TwilioWebhookDto } from './dto';
import { CustomApiResponse } from '../core/shared/docs/decorators';

@Controller('ims-stockmate')
export class ImsStockmateController {
  constructor(private readonly imsStockmateService: ImsStockmateService) {}

  @CustomApiResponse(['success'], {
    type: String,
    message: 'query passed successfully',
  })
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: TwilioWebhookDto) {
    return this.imsStockmateService.create(dto);
  }
}
