import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../shared/enums/drugOrder.enum';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateDrugOrderDto {
  @ApiPropertyOptional({
    description: 'The expected delivery date of the order',
    example: new Date().toISOString(),
  })
  @IsOptional()
  @IsDateString() // more validators will be added to this property when date format is provided
  expectedDeliveryDate?: Date;

  @ApiProperty({
    description: 'The status of the order',
    example: 'cancelled',
    enum: ['requested', 'draft', 'cancelled', 'delivering', 'received'],
    default: 'draft',
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
