import { Model } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export type AuditContext = {
  userId?: string;
  transaction?: any;
  skipAudit?: boolean;
};

export class BaseService<TModel extends Model> {
  constructor(
    protected readonly model: { new (): TModel } & typeof Model,
    protected readonly sequelize: Sequelize,
  ) {}

  protected buildAuditOptions(ctx: AuditContext = {}) {
    return {
      userId: ctx.userId,
      transaction: ctx.transaction,
      skipAudit: ctx.skipAudit,
      individualHooks: true,
    };
  }

  async create(data: any, ctx?: AuditContext) {
    return this.model.create(data, this.buildAuditOptions(ctx));
  }

  async bulkCreate(data: any[], ctx?: AuditContext) {
    return this.model.bulkCreate(data, this.buildAuditOptions(ctx));
  }

  async update(data: any, options: any, ctx?: AuditContext) {
    return this.model.update(data, {
      ...options,
      ...this.buildAuditOptions(ctx),
    });
  }

  async destroy(options: any, ctx?: AuditContext) {
    return this.model.destroy({
      ...options,
      ...this.buildAuditOptions(ctx),
    });
  }

  async findByPk(id: string, ctx?: AuditContext) {
    return this.model.findByPk(id, { transaction: ctx?.transaction });
  }

  async findAll(options: any = {}, ctx?: AuditContext) {
    return this.model.findAll({ ...options, transaction: ctx?.transaction });
  }

  async findOne(options: any = {}, ctx?: AuditContext) {
    return this.model.findOne({ ...options, transaction: ctx?.transaction });
  }
}
