import { ApiResponseProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { NotificationStatus } from '../enum';

export class CreateNotificationDto {
  @ApiResponseProperty({
    example: '44220956-0962-4dd0-9e65-1564c585563c',
  })
  id: string;

  @ApiResponseProperty({
    example: 'Paracetamol has low stock',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiResponseProperty({
    example: 'View Item',
  })
  @IsOptional()
  @IsString()
  linkName: string;

  @ApiResponseProperty({
    example: '/home',
  })
  @IsOptional()
  @IsString()
  linkRoute: string;

  @ApiResponseProperty({
    example: 'UNREAD',
    enum: NotificationStatus,
  })
  @IsNotEmpty()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  @ApiResponseProperty({
    example: new Date(),
  })
  createdAt: Date;
}
