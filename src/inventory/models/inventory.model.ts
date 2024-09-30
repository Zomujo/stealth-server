import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';
import { User } from 'src/auth/models/user.model';
import { Drug } from '../drugs/models/drug.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Table({
  tableName: 'facilities',
  underscored: true,
})
export class Facility extends BaseModel {
  @ApiProperty({
    example: 'Hospital A',
    description: 'The name of the hospital',
  })
  @IsString()
  @IsNotEmpty()
  @Column
  name: string;

  @ApiProperty({
    example: 'North',
    description: 'The region where the hospital is located',
  })
  @IsString()
  @IsNotEmpty()
  @Column
  region: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The physical location of the hospital',
  })
  @Column
  location: string;

  @ApiProperty({
    example: [],
    description: 'List of departments in the hospital',
  })
  @HasMany(() => Department)
  departments: Department[];

  @ApiProperty({ example: [], description: 'List of workers in the hospital' })
  @HasMany(() => User)
  workers: User[];

  @ApiProperty({
    example: [],
    description: 'List of drugs available in the hospital',
  })
  @HasMany(() => Drug)
  drugs: Drug[];

  // @HasMany(() => Order)
  // orders: Order[];

  // @HasMany(() => StockAdjustment)
  // stockAdjustments: StockAdjustment[];

  // @HasMany(() => StockRequest)
  // stockRequests: StockRequest[];

  // @HasMany(() => Sale)
  // sales: Sale[];

  // @HasMany(() => Setting)
  // settings: Setting[];
}

@Table({
  tableName: 'departments',
  underscored: true,
})
export class Department extends BaseModel {
  @ApiProperty({
    example: 'Department A',
    description: 'The name of the department',
  })
  @IsString()
  @IsNotEmpty()
  @Column
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the hospital to which the department belongs',
  })
  @IsUUID()
  @IsNotEmpty()
  @ForeignKey(() => Facility)
  @Column
  facilityId: number;

  @ApiProperty({
    example: {},
    description: 'The hospital to which the department belongs',
  })
  @BelongsTo(() => Facility)
  hospital: Facility;

  @ApiProperty({
    example: [],
    description: 'List of workers in the department',
  })
  @HasMany(() => User)
  workers: User[];

  @ApiProperty({
    example: [],
    description: 'List of drugs available in the department',
  })
  @HasMany(() => Drug)
  drugs: Drug[];

  // @HasMany(() => Order)
  // orders: Order[];

  // @HasMany(() => StockAdjustment)
  // stockAdjustments: StockAdjustment[];

  // @HasMany(() => StockRequest)
  // stockRequests: StockRequest[];

  // @HasMany(() => Sale)
  // sales: Sale[];

  // @HasMany(() => Setting)
  // settings: Setting[];
}
