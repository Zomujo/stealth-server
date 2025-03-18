import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  AfterFind,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/inventory/items/models/item.model';
import { BaseModel } from 'src/core/shared/models/base.model';
import { Facility } from '../../../admin/facility/models/facility.model';

export enum ItemCategoryStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

@Table({
  tableName: 'item_categories',
  underscored: true,
})
export class ItemCategory extends BaseModel {
  @Column
  @ApiProperty({
    example: 'laxatives',
    description: 'item category name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({
    type: DataType.ENUM('ACTIVE', 'DEACTIVATED'),
    defaultValue: 'ACTIVE',
  })
  @ApiProperty({
    example: ItemCategoryStatus.ACTIVE,
    description: 'item category status',
    enum: ItemCategoryStatus,
  })
  status: ItemCategoryStatus;

  @ForeignKey(() => Facility)
  @Column
  facilityId: string;

  @BelongsTo(() => Facility)
  facility: Facility;

  @HasMany(() => Item)
  items: Item[];

  @ApiProperty({
    example: 100,
    description: 'Number of items under category',
  })
  @Column({ type: DataType.VIRTUAL })
  itemCount: number;

  @AfterFind
  static async calculateItemCount(instance: ItemCategory[] | ItemCategory) {
    if (Array.isArray(instance)) {
      for (const category of instance) {
        if (category.items) {
          category.itemCount = category.items ? category.items.length : 0;
        }
      }
    } else {
      instance.itemCount = instance.items ? instance.items.length : 0;
    }
  }
}
