import { AllowNull, Column, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from '../../shared/models/base.model';
import { Facility } from '../../admin/facility/models/facility.model';
import { Department } from '../../admin/department/models/department.model';
import { Features } from '../../shared/enums/permissions.enum';

@Table({
  tableName: 'notifications',
  underscored: true,
})
export class NotificationModel extends BaseModel {
  @Column
  message: string;

  @AllowNull
  @Column
  linkName: string;

  @AllowNull
  @Column
  linkRoute: string;

  @Column
  feature: Features;

  @ForeignKey(() => Facility)
  @Column
  facilityId: string;

  @ForeignKey(() => Department)
  @AllowNull
  @Column
  departmentId: string;
}
