import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AdminChangePasswordDto {
  @ApiProperty({
    example: 'NewPassword123!',
    description: 'The new password for the user',
  })
  @IsNotEmpty()
  @MinLength(4)
  newPassword: string;

  userId: string;
}
