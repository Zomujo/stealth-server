import { UUID } from 'sequelize';
import {
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

  @Column({ type: DataType.STRING, field: 'created_by' })
  createdBy: string;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @Column({ type: DataType.STRING, field: 'updated_by' })
  updatedBy: string;

  @DeletedAt
  @Column({ type: DataType.DATE, field: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: DataType.STRING, field: 'deleted_by' })
  deletedBy: string;
}
