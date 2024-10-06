'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */
const baseModelColumns = require('../migration-base');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('department_requests', {
      ...baseModelColumns,

      drugId: {
        type: Sequelize.UUID,
        field: 'drug_id',
        allowNull: false,
        references: {
          model: 'drugs',
          key: 'id',
        },
      },

      departmentId: {
        type: Sequelize.UUID,
        field: 'department_id',
        allowNull: false,
        references: {
          model: 'departments',
          key: 'id',
        },
      },

      requestId: {
        type: Sequelize.STRING,
        field: 'request_id',
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity',
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM('PENDING', 'ACCEPTED', 'DELIVERED', 'CANCELLED'),
        field: 'status',
        allowNull: false,
      },

      additionalNotes: {
        type: Sequelize.TEXT,
        field: 'additional_notes',
        allowNull: true,
      },
    });
  },

  async down(queryInterface, _) {
    await queryInterface.dropTable('department_requests');
  },
};
