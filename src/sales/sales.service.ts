import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create.dto';

@Injectable()
export class SalesService {
  create(_: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  fetchAll() {
    return [];
  }
}
