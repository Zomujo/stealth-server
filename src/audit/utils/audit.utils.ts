import { Sequelize } from 'sequelize-typescript';

export async function getBeforeSnapshot(
  sequelize: Sequelize,
  modelName: string,
  id: string,
) {
  const model = sequelize.model(modelName);
  if (!model) throw new Error(`Model ${modelName} not found in Sequelize`);
  const instance = await model.findByPk(id);
  return instance?.toJSON() || null;
}
