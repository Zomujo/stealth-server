import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDrugDto } from './create-drug.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateDrugDto extends PartialType(CreateDrugDto) {
  @ApiProperty({
    example: "kdjoosyf739kdlj2u030",
    description: 'The id of the drug',
  })
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
