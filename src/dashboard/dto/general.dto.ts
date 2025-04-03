import { ApiResponseProperty } from '@nestjs/swagger';
import { ChangeType } from '../../inventory/items/dto';

export class GeneralAnalyticsDto {
  itemStockLevel: {
    totalStock: number;
    percentageChange: number;
    changeType: ChangeType;
    items: [{ itemName: string; quantity: number }];
  };

  totalItemsSold: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };

  totalTransactions: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };

  inventoryTurnoverRate: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };

  totalRevenue: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };

  averageItemsPerTransaction: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };

  customers: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };

  soonToExpireItems: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };

  itemsReturned: {
    total: number;
    percentageChange: number;
    changeType: ChangeType;
  };
}
export class ItemSalesAnalyticsDto {
  @ApiResponseProperty({ example: 6.8 })
  average: number;

  @ApiResponseProperty({
    example: {
      names: ['paracetamol', 'eyeDrop', 'condom', 'painKiller', 'inhaler'],
      quantities: [90, 100, 50, 30, 150],
    },
  })
  items: { names: string[]; quantities: number[] };
}
