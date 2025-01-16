import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Query,
  Sse,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';
import { throwError } from '../utils/responses/error.response';
import { CustomApiResponse } from '../shared/docs/decorators';
import { GetNotificationDto } from './dto/get.dto';
import { GetUser } from '../auth/decorator';
import { IUserPayload } from '../auth/interface/payload.interface';
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
} from '../utils/responses/success.response';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  private logger = new Logger(NotificationController.name);
  constructor(private notificationService: NotificationService) {}

  @CustomApiResponse(['successNoWrap'], {
    type: GetNotificationDto,
    message: 'Notification pushed to event stream successfully',
  })
  @Sse('stream')
  async streamEvents(
    @Query('token') token: string,
  ): Promise<Observable<MessageEvent>> {
    try {
      const user = await this.notificationService.authenticateUser(token);

      return this.notificationService
        .getNotifications(user.permissions, user.department)
        .pipe(
          map(
            (notification) =>
              ({
                data: notification,
              }) as MessageEvent,
          ),
        );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['success', 'authorize'], {
    type: GetNotificationDto,
    isArray: true,
    message: 'Notifications retrieved successfully',
  })
  @Get()
  async fetchAllNotifications(@GetUser() user: IUserPayload) {
    try {
      const response = await this.notificationService.getAll(user);

      return new ApiSuccessResponseDto(
        response,
        HttpStatus.OK,
        'Notifications retrieved successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }

  @CustomApiResponse(['successNull', 'authorize'], {
    message: 'Notification deleted successfully',
  })
  @Delete(':id')
  async deleteNotifications(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const _response = await this.notificationService.remove(id);

      return new ApiSuccessResponseNoData(
        HttpStatus.OK,
        'Notification deleted successfully',
      );
    } catch (error) {
      throwError(this.logger, error);
    }
  }
}
