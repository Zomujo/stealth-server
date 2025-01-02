import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'src/shared/models/base.model';
import { Patient } from '../../patient/models/patient.model';
import { Department } from '../../admin/department/models/department.model';
import { Facility } from '../../admin/facility/models/facility.model';

export enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export enum SalePaymentType {
  CASH = 'CASH',
  ONLINE = 'ONLINE',
}

@Table({
  tableName: 'sales',
  underscored: true,
})
export class Sale extends BaseModel {
  @Column({ type: DataType.STRING })
  saleNumber: string;

  @Column
  paymentType: string;

  @Column(DataType.ARRAY(DataType.JSONB))
  saleItems: object[];

  @Column
  subTotal: number;

  @Column
  total: number;

  @Column(DataType.TEXT)
  notes: string;

  @Default(PaymentStatus.PAID)
  @Column
  status: string;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt: Date;

  @Column
  deletedBy: string;

  @ForeignKey(() => Patient)
  @AllowNull
  @Column(DataType.UUID)
  patientId: string;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ForeignKey(() => Department)
  @AllowNull
  @Column(DataType.UUID)
  departmentId: string;

  @BelongsTo(() => Department)
  department: Department;

  @ForeignKey(() => Facility)
  @Column(DataType.UUID)
  facilityId: string;

  @BelongsTo(() => Facility)
  facility: Facility;
}
