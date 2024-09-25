import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDrugsCategoryDto } from './create-drugs.category.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateDrugsCategoryDto extends PartialType(CreateDrugsCategoryDto) {
  @ApiProperty({
    example: "kdjoosyf739kdlj2u030",
    description: 'drug category id',
  })
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
