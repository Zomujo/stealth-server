'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create 'drugs' table with a reference to 'drug_categories'
    await queryInterface.createTable('drugs', {
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
      cost_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      selling_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dosage_form: {
        type: Sequelize.ENUM('SOLIDS', 'LIQUIDS'),
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      validity: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fda_approval: {
        type: Sequelize.STRING,
      },
      ISO: {
        type: Sequelize.STRING,
      },
      batch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reorder_point: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplier_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.ENUM('LOW', 'STOCKED', 'OUT_OF_STOCK'),
        allowNull: false,
      },
      storage_req: {
        type: Sequelize.TEXT,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'drug_categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface) {
    // Drop 'drugs' first because it has a foreign key reference
    await queryInterface.dropTable('drugs');
  },
};
