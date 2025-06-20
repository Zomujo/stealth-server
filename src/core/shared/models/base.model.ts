import {
	AllowNull,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	PrimaryKey,
	UpdatedAt,
} from 'sequelize-typescript';
import { AuditLog } from '../../../audit/models/audit.model';

export abstract class BaseModel extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id: string;

	@CreatedAt
	@Column({ type: DataType.DATE, field: 'created_at' })
	createdAt: Date;

	@AllowNull
	@ForeignKey(() => User)
	@Column({ field: 'created_by_id' })
	createdById: string;

	@ApiResponseProperty({
		type: () => User,
		example: {
			id: 'b7a3fb48-6b76-4998-9cd3-4de5b8a18837',
			name: 'Some Admin',
		},
	})
	@BelongsTo(() => User)
	createdBy: User;

	@UpdatedAt
	@Column({ type: DataType.DATE, field: 'updated_at' })
	updatedAt: Date;

	@AllowNull
	@ForeignKey(() => User)
	@Column({ field: 'updated_by_id' })
	updatedById: string;

	@ApiResponseProperty({
		type: () => User,
		example: null,
	})
	@BelongsTo(() => User)
	updatedBy: User;

	@AfterCreate
	static async logCreate(instance: BaseModel, options: any) {
		if (options.skipAudit) return;
		console.log(`${instance.constructor.name} created hook options:`, options);

		const [auditLog, created] = await AuditLog.findOrCreate({
			where: {
				userId: instance.createdById,
				action: 'CREATE',
				tableName: 'unknown',
				source: 'api',
			},
			defaults: {
				userId: instance.createdById || null,
				action: 'CREATE',
				tableName: instance.constructor.name,
				recordId: instance.id,
				after: instance.toJSON(),
				source: 'sequelize-hook',
				description: `Created ${instance.constructor.name}`,
			},
			transaction: options.transaction,
		});

		if (!created) {
			await auditLog.update(
				{
					userId: instance.createdById || null,
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
	}

	@AfterUpdate
	static async logUpdate(instance: BaseModel, options: any) {
		if (options.skipAudit) return;
		console.log(`${instance.constructor.name} updated hook options:`, options);

		const [auditLog, created] = await AuditLog.findOrCreate({
			where: {
				userId: instance.updatedById,
				action: 'UPDATE',
				tableName: 'unknown',
				source: 'api',
			},
			defaults: {
				userId: instance.updatedById || null,
				action: 'UPDATE',
				tableName: instance.constructor.name,
				recordId: instance.id,
				before: instance.previous(),
				after: instance.dataValues,
				source: 'sequelize-hook',
				description: `Updated ${instance.constructor.name}`,
			},
			transaction: options.transaction,
		});
		console.log('created?', created);
		if (!created) {
			await auditLog.update(
				{
					userId: instance.updatedById || null,
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
	}

	@AfterDestroy
	static async logDelete(instance: BaseModel, options: any) {
		if (options.skipAudit) return;
		console.log(`${instance.constructor.name} deleted hook options:`, options);

		const [auditLog, created] = await AuditLog.findOrCreate({
			where: {
				userId: instance.deletedById || options.userId,
				action: 'DELETE',
				tableName: 'unknown',
				source: 'api',
			},
			defaults: {
				userId: instance.deletedById || options.userId || null,
				action: 'DELETE',
				tableName: instance.constructor.name,
				recordId: instance.id,
				before: instance.toJSON(),
				after: null,
				source: 'sequelize-hook',
				description: `Deleted ${instance.constructor.name}`,
			},
			transaction: options.transaction,
		});

		if (!created) {
			await auditLog.update(
				{
					userId: instance.deletedById || options.userId || null,
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
}
