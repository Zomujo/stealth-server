import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { OrderStatus } from '../../shared/enums/itemOrder.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  MinDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GenericResponseDto } from '../../shared/docs/dto/base.dto';

export class CreateItemOrderDto extends GenericResponseDto {
  @ApiProperty({
    description: 'The id of the item',
    example: '1ad1fccc-d279-46a0-8980-1d91afd6ba67',
  })
  @IsNotEmpty()
  @IsUUID(4)
  itemId: string;

  @ApiProperty({ description: 'The quantity of the item', example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'The id of the supplier',
    example: '5108babc-bf35-44d5-a9ba-de08badfa80a',
  })
  @IsNotEmpty()
  @IsUUID(4)
  supplierId: string;

  @ApiResponseProperty({
    example: '4456677383',
  })
  @IsOptional()
  orderNumber: string;

  @ApiPropertyOptional({
    description: 'The expected delivery date of the order',
    example: new Date(),
  })
  @IsOptional()
  @Type(() => Date)
  @MinDate(new Date())
  expectedDeliveryDate?: Date;

  @ApiProperty({
    description: 'The payment method for the item',
    example: 'Pay On Delivery',
  })
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({
    description: 'The method of delivering the item',
    example: 'Courier',
  })
  @IsNotEmpty()
  deliveryMethod: string;

  @ApiProperty({
    description: 'The delivery address',
    example: '123 Wellness Avenue, Suite 456',
  })
  @IsNotEmpty()
  deliveryAddress: string;

  @ApiPropertyOptional({
    description: 'The additional notes for an order',
    example: 'Needed as soon as possible',
  })
  @IsOptional()
  additionalNotes: string;

  @ApiProperty({
    description: 'The status of the order for the item',
    example: 'draft',
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
