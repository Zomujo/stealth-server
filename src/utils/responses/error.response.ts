import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ForeignKeyConstraintError, UniqueConstraintError } from 'sequelize';

export class ApiErrorResponse {
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
  @ApiProperty()
  statusCode: number;
}

export function throwError(logger: Logger, error: any) {
  if (error instanceof UniqueConstraintError) {
    const err = error.errors[0];
    logger.warn(`${err.path} ${err.value} already exists`);
    throw new BadRequestException(
      `${err.path.replaceAll('_', ' ')} ${err.value} is already in use`,
    );
  }
  if (error instanceof ForeignKeyConstraintError) {
    throw new BadRequestException((error.original as any).detail);
  }
  if (error instanceof HttpException) {
    throw error;
  }
  logger.error(
    `An error occured: ${error.name} :: ${error.message}`,
    error.stack,
  );
  throw new InternalServerErrorException(error.message, error);
}
