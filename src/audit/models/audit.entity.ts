import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table({ tableName: 'audit_logs', timestamps: true, underscored: true })
export class AuditLog extends Model<AuditLog> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  userId: string;

  @Column
  action: 'CREATE' | 'UPDATE' | 'DELETE';

  @Column
  tableName: string;

  @Column
  recordId: string;

  @Column(DataType.JSONB)
  before: any;

  @Column(DataType.JSONB)
  after: any;

  @AllowNull
  @Column
  description: string;

  @AllowNull
  @Column
  ipAddress: string;

  @AllowNull
  @Column
  userAgent: string;

  @AllowNull
  @Column
  source: string;

  @AllowNull
  @Column
  requestUrl: string;

  @AllowNull
  @Column
  method: string;

  @AllowNull
  @Column
  context: string;

  @AllowNull
  @Column
  statusCode: number;

  @AllowNull
  @Column
  correlationId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
