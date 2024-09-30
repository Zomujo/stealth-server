import {
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from '../../shared/models/base.model';
import { Department, Facility } from 'src/inventory/models/inventory.model';

@Table({
  tableName: 'users',
  underscored: true,
})
export class User extends BaseModel {
  @Column
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column
  phoneNumber: string;

  @ForeignKey(() => Facility)
  @Column
  facilityId: string;

  @BelongsTo(() => Facility)
  facility: Facility;

  @ForeignKey(() => Department)
  @Column({ allowNull: true })
  departmentId: string;

  @BelongsTo(() => Department)
  department?: Department;

  @Column
  role: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  accountApproved: boolean;

  @Column({ defaultValue: 'ACTIVE' })
  status: string; //ACTIVE | DEACTIVATED

  @Column({ allowNull: true })
  deactivatedBy: string;

  @DeletedAt
  @Column({ type: DataType.DATE, field: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: DataType.STRING, field: 'deleted_by' })
  deletedBy: string;
}
