import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSmsDto {
  @ApiProperty({
    example: '+233551426556',
  })
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'Yo chaley wagwan',
  })
  @IsNotEmpty()
  body: string;
}
