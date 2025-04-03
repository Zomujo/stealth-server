import { ApiResponseProperty } from '@nestjs/swagger';

export class SalesTrendDto {
  @ApiResponseProperty({
    example: {
      dates: [
        '2025-03-05T00:00:00.000Z',
        '2025-03-10T00:00:00.000Z',
        '2025-03-15T00:00:00.000Z',
        '2025-03-20T00:00:00.000Z',
        '2025-03-25T00:00:00.000Z',
      ],
      quantities: [190, 400, 600, 800, 1000],
    },
  })
  trend: { dates: Date[]; quantities: number[] };
}

export class TopSellingCategoriesDto {
  @ApiResponseProperty({
    example: {
      categories: ['Syrup', 'Tablets', 'Analgesics', 'Inhalers'],
      quantities: [54071, 161466, 81981, 67889],
    },
  })
  topSelling: { categories: string[]; quantities: number[] };
}

export class DailySalesDto {
  @ApiResponseProperty({
    example: {
      categories: ['Syrup', 'Tablets', 'Analgesics', 'Inhalers'],
      quantities: [54071, 161466, 81981, 67889],
    },
  })
  topSelling: { categories: string[]; quantities: number[] };
}

export class SalesPaymentMethodDto {
  @ApiResponseProperty({
    example: {
      categories: ['MobileMoney', 'Cash', 'Bank', 'Card'],
      quantities: [54071, 161466, 81981, 67889],
    },
  })
  topSelling: { categories: string[]; quantities: number[] };
}

export class RecentSalesDto {}
