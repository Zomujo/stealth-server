import { ApiResponseProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  linkName: string;

  @ApiResponseProperty({
    example: '/home',
  })
  @IsNotEmpty()
  @IsString()
  linkRoute: string;

  @ApiResponseProperty({
    example: new Date(),
  })
  createdAt: Date;
}
