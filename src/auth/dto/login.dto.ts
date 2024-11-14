import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateLoginSessionDto } from './login-session.dto';

export class LoginDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'The email of the registered user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'XT(v2EiTqQZ',
    description: 'The password for the user',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: CreateLoginSessionDto,
    description: 'Login session metadata',
  })
  @IsNotEmpty()
  loginSessionMeta: CreateLoginSessionDto;
}
