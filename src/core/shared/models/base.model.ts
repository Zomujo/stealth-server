import { UUID } from 'sequelize';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';

export abstract class BaseModel extends Model {
  @Column({
    type: UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
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
}
