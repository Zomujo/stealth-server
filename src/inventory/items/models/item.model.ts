import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasMany,
  AfterFind,
} from 'sequelize-typescript';
import { Department } from 'src/admin/department/models/department.model';
import { Facility } from 'src/admin/facility/models/facility.model';
import { DepartmentRequest } from 'src/department-requests/models/department-requests.model';
import { ItemCategory } from 'src/inventory/items-category/models/items-category.model';
import { BaseModel } from 'src/core/shared/models/base.model';
import { Batch } from '.';
import { StockAdjustment } from '../../models/stock-adjustment.model';
import { User } from '../../../auth/models/user.model';
import { DosageForm } from '../dto';

@Table({
  tableName: 'items',
  underscored: true,
})
export class Item extends BaseModel {
  @Column
  name: string;

  @Column({ type: DataType.STRING, field: 'brand_name' })
  brandName: string;

  @Column({ type: DataType.STRING, field: 'dosage_form' })
  dosageForm: DosageForm;

  @Column({ type: DataType.DOUBLE, allowNull: false, field: 'cost_price' })
  costPrice: number;

  @Column({ type: DataType.DOUBLE, allowNull: false, field: 'selling_price' })
  sellingPrice: number;

  @Column
  code: string;

  @Column
  fdaApproval: string;

  @Column({ field: 'ISO' })
  ISO: string;

  @Column
  manufacturer: string;

  @Column
  strength: string;

  @Column({ field: 'unit_of_measurement' })
  unitOfMeasurement: string;

  @Column({ type: DataType.TEXT, field: 'storage_req' })
  storageReq: string;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'reorder_point' })
  reorderPoint: number;

  @Column({
    type: DataType.ENUM('LOW', 'STOCKED', 'OUT_OF_STOCK'),
    allowNull: false,
  })
  status: string;

  @Column({ field: 'created_by_id', allowNull: true })
  createdById: string;

  @Column(DataType.VIRTUAL)
  createdBy: string;

  // relationships

  @ForeignKey(() => ItemCategory)
  @Column({
    type: DataType.UUID,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'category_id',
  })
  categoryId: string;

  @BelongsTo(() => ItemCategory)
  category: ItemCategory;

  @ForeignKey(() => Facility)
  @Column({
    type: DataType.UUID,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  facilityId: string;

  @BelongsTo(() => Facility)
  facility: Facility;

  @ForeignKey(() => Department)
  @Column({ allowNull: true })
  departmentId: string;

  @BelongsTo(() => Department)
  department: Department;

  @HasMany(() => Batch)
  batches: Batch[];

  @HasMany(() => StockAdjustment)
  stockAdjustments: StockAdjustment[];

  @HasMany(() => DepartmentRequest)
  departmentRequests: DepartmentRequest[];

  @AfterFind
  static async addCreatedByUser(items: Item | Item[]) {
    if (!items) return;
    const records = Array.isArray(items) ? items : [items];

    if (!records.length) return;

    const createdByNotExist = records.every((record) => !record.createdById);
    if (createdByNotExist) return;

    const userIds = records.map((record) => record.createdById);

    const users = await User.findAll({
      where: {
        id: userIds,
      },
      attributes: ['id', 'fullName', 'email'],
    });

    const userMap = new Map(users.map((user) => [user.id, user]));

    for (const record of records) {
      const user = userMap.get(record.createdById) || null;

      record.createdBy = `${user.fullName},${user.id}`;
    }
  }
}
