import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  AfterFind,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from '../../../core/shared/models/base.model';
import { User } from '../../../auth/models/user.model';
// import { Item } from '../../../inventory/items/models/item.model';
import { Facility } from '../../facility/models/facility.model';
import { DepartmentRequest } from 'src/department-requests/models/department-requests.model';
import { StockAdjustment } from 'src/inventory/models/stock-adjustment.model';

@Table({
  tableName: 'departments',
  underscored: true,
})
export class Department extends BaseModel {
  @ApiProperty({
    example: 'Department A',
    description: 'The name of the department',
  })
  @IsString()
  @IsNotEmpty()
  @Column
  name: string;

  @ApiProperty({
    example: '44220956-0962-4dd0-9e65-1564c585563c',
    description: 'The ID of the hospital to which the department belongs',
  })
  @IsUUID()
  @IsNotEmpty()
  @ForeignKey(() => Facility)
  @Column
  facilityId: string;

  @BelongsTo(() => Facility)
  facility: Facility;

  @HasMany(() => User)
  workers: User[];

  @HasMany(() => StockAdjustment)
  stockAdjustments: StockAdjustment[];
  @HasMany(() => DepartmentRequest)
  departmentRequests: DepartmentRequest[];

  @ApiResponseProperty({
    example: {
      id: 'b7a3fb48-6b76-4998-9cd3-4de5b8a18837',
      name: 'Some Admin',
    },
  })
  @Column({ field: 'created_by', allowNull: true, type: DataType.JSON })
  createdBy: Pick<User, 'id' | 'fullName'>;

  @ApiResponseProperty({
    example: null,
  })
  @Column({ field: 'updated_by', allowNull: true, type: DataType.JSON })
  updatedBy: Pick<User, 'id' | 'fullName'>;

  @AfterFind
  static async addCreatedByUser(departments: Department | Department[]) {
    if (!departments) return;
    const records = Array.isArray(departments) ? departments : [departments];

    if (!records.length) return;

    const createdByNotExist = records.every((record) => !record.createdBy.id);
    if (createdByNotExist) return;

    const userIds = records.map((record) => record.createdBy.id);

    const users = await User.findAll({
      where: {
        id: userIds,
      },
      attributes: ['id', 'fullName', 'email'],
    });

    const userMap = new Map(users.map((user) => [user.id, user]));

    for (const record of records) {
      const user = userMap.get(record.createdBy.id) || null;

      record.createdBy = {
        id: user.id,
        fullName: user.fullName,
      };
    }
  }
}
