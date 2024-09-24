import { ApiProperty } from '@nestjs/swagger';

export class ApiSuccessResponseDto<T> {
  constructor(data: T, statusCode: number, message: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }
  @ApiProperty({})
  data?: T;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}

export class ApiSuccessResponseNoData {
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
