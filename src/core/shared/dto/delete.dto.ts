import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteItemsDto {
  @ApiProperty({
    example: [
      '0723e7a1-ec12-4cdb-b4d5-6169dba540c6',
      'ff68e22e-633f-4fe3-b482-590c7163b7e1',
    ],
    description: 'Ids of suppliers to be deleted',
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
