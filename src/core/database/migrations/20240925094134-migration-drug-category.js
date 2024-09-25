'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create 'drug_categories' table
    await queryInterface.createTable('drug_categories', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'DEACTIVATED'),
        defaultValue: 'ACTIVE',
      },
      drug_count: {
        type: Sequelize.INTEGER,
        get: async () => {
          return await Sequelize.Model.count(
            'drugs',
            where({ category_id: this.id }),
          );
        },
      },
    });
  },

  async down(queryInterface) {
    // Drop 'drug_categories'
    await queryInterface.dropTable('drug_categories');
  },
};
