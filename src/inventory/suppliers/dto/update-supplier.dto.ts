import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @ApiProperty({
    example: "kdjoosyf739kdlj2u030",
    description: 'The id of the drug',
  })
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
