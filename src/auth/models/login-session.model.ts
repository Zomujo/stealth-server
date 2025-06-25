import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from '../../core/shared/models/base.model';
import { User } from '../../auth/models/user.model';
import { formatDistance } from 'date-fns';

export enum StatusType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Table({
  tableName: 'login_sessions',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export class LoginSession extends BaseModel<LoginSession> {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @AllowNull
  @ForeignKey(() => User)
  @Column
  createdById: string;

  @BelongsTo(() => User)
  createdBy: User;

  @AllowNull
  @ForeignKey(() => User)
  @Column
  updatedById: string;

  @BelongsTo(() => User)
  updatedBy: User;

  @AllowNull
  @ForeignKey(() => User)
  @Column
  deletedById: string;

  @BelongsTo(() => User)
  deletedBy: User;

  @Column
  browser: string;

  @Column
  location: string;

  @Column({
    type: DataType.ENUM(StatusType.ACTIVE, StatusType.INACTIVE),
    defaultValue: StatusType.ACTIVE,
  })
  status: StatusType;

  @Column({
    type: DataType.VIRTUAL,
    get(this: LoginSession) {
      if (this.status !== StatusType.ACTIVE) {
        const activityDistance = formatDistance(
          new Date(this.updatedAt),
          new Date(),
          {
            addSuffix: true,
          },
        );
        return activityDistance;
      } else {
        return 'Current Session';
      }
    },
  })
  activity: string;
}
