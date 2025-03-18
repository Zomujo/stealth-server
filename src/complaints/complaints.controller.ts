import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create.dto';
import { GetUser } from '../auth/decorator';
import { ApiSuccessResponseNoData } from '../core/shared/responses/success.response';
import { CustomApiResponse } from '../core/shared/docs/decorators';
import { throwError } from '../core/shared/responses/error.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Complaints')
@Controller('complaints')
export class ComplaintsController {
  private logger = new Logger(ComplaintsController.name);
  constructor(private readonly complaintsService: ComplaintsService) {}

  @CustomApiResponse(['successNull', 'authorize'], {
    message: 'Complaint lodged successfully',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createComplaintDto: CreateComplaintDto,
    @GetUser('sub') userId: string,
  ) {
    try {
      const _response = await this.complaintsService.create(
        createComplaintDto,
        userId,
      );
      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Complaint lodged successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }
}
