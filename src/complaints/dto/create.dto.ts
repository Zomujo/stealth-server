import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateComplaintDto {
  @ApiProperty({
    example: 'I have issues with logging in',
    description: 'The complaint lodged by the user',
  })
  @IsNotEmpty()
  complaint: string;
}
