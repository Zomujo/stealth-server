import {
  AfterCreate,
  AfterDestroy,
  AfterUpdate,
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';
import { AuditLog } from '../../../audit/models/audit.entity';

export abstract class BaseModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @AllowNull
  @Column({ field: 'created_by_id', type: DataType.UUID })
  createdById: string;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @AllowNull
  @Column({ field: 'updated_by_id', type: DataType.UUID })
  updatedById: string;

  @DeletedAt
  @Column({ type: DataType.DATE, field: 'deleted_at' })
  deletedAt: Date;

  @AllowNull
  @Column({ field: 'deleted_by_id', type: DataType.UUID })
  deletedById: string;

  @AfterCreate
  static async logCreate(instance: BaseModel, options: any) {
    if (options.skipAudit) return;

    await AuditLog.create(
      {
        userId: options.userId || null,
        action: 'CREATE',
        tableName: instance.constructor.name,
        recordId: instance.id,
        after: instance.toJSON(),
        source: 'sequelize-hook',
        description: `Created ${instance.constructor.name}`,
      },
      { transaction: options.transaction },
    );
  }

  @AfterUpdate
  static async logUpdate(instance: BaseModel, options: any) {
    if (options.skipAudit) return;

    await AuditLog.create(
      {
        userId: options.userId || null,
        action: 'UPDATE',
        tableName: instance.constructor.name,
        recordId: instance.id,
        before: instance.previous(),
        after: instance.dataValues,
        source: 'sequelize-hook',
        description: `Updated ${instance.constructor.name}`,
      },
      { transaction: options.transaction },
    );
  }

  @AfterDestroy
  static async logDelete(instance: BaseModel, options: any) {
    if (options.skipAudit) return;

    await AuditLog.create(
      {
        userId: options.userId || null,
        action: 'DELETE',
        tableName: instance.constructor.name,
        recordId: instance.id,
        before: instance.toJSON(),
        after: null,
        source: 'sequelize-hook',
        description: `Deleted ${instance.constructor.name}`,
      },
      { transaction: options.transaction },
    );
  }
}
