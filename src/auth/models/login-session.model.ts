import {
  AfterFind,
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
export class LoginSession extends BaseModel {
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

  @Column({ type: DataType.VIRTUAL })
  activity: string;

  @AfterFind
  static async afterFindHook(
    loginSessions: LoginSession | LoginSession[],
  ): Promise<void> {
    if (!loginSessions) {
      return;
    }

    if (!Array.isArray(loginSessions)) {
      loginSessions = [loginSessions];
    }

    loginSessions.forEach((loginSession: LoginSession) => {
      if (loginSession.status !== StatusType.ACTIVE) {
        const activityDistance = formatDistance(
          new Date(loginSession.updatedAt),
          new Date(),
          {
            addSuffix: true,
          },
        );
        loginSession.activity = activityDistance;
      } else {
        loginSession.activity = 'Current Session';
      }
    });
  }
}
