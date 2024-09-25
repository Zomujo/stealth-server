import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';

@Table({
  tableName: 'drugs',
  underscored: true,
})
export class Drug extends BaseModel {
  @Column
  name: string;

  @Column({ type: DataType.DOUBLE, allowNull: false, field: 'cost_price' })
  costPrice: number;

  @Column({ type: DataType.DOUBLE, allowNull: false, field: 'selling_price' })
  sellingPrice: number;

  @Column({ type: DataType.ENUM('SOLIDS', 'LIQUIDS'), field: 'dosage_form' })
  dosageForm: string;

  @Column
  code: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  validity: Date;

  @Column
  fdaApproval: string;

  @Column
  ISO: string;

  @Column
  batch: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stock: number;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'reorder_point' })
  reorderPoint: number;

  @Column
  manufacturer: string;

  @Column({ type: DataType.ENUM('LOW', 'STOCKED', 'OUT_OF_STOCK'), allowNull: false })
  status: string;

  @Column({ type: DataType.TEXT, field: 'storage_req' })
  storageReq: string;

  @Column({ type: DataType.UUID, allowNull: false, references: { model: 'drug_categories', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE', field: 'category_id' })
  categoryId: string;
}
