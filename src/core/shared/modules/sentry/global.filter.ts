import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import { Request } from 'express';

@Catch()
export class CatchAllExceptionFilter implements ExceptionFilter {
  private logger = new Logger(CatchAllExceptionFilter.name);

  @SentryExceptionCaptured()
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      },
      exception.stack,
    );
  }
}
