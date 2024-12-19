import { PartialType } from '@nestjs/swagger';
import { CreateItemOrderDto } from './createOrder.dto';

export class UpdateItemOrderDto extends PartialType(CreateItemOrderDto) {}
