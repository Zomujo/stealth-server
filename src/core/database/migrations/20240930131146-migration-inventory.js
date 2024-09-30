/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
const baseModelColumns = require('../migration-base.js');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facilities', {
      ...baseModelColumns,
      name: { type: Sequelize.STRING },
      region: { type: Sequelize.STRING },
      location: { type: Sequelize.STRING },
    });

    await queryInterface.createTable('departments', {
      ...baseModelColumns,
      name: { type: Sequelize.STRING },
      facilityId: {
        references: {
          model: 'facilities',
          key: 'id',
        },
        type: Sequelize.UUID,
        field: 'facility_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addColumn('users', 'department_id', {
      references: {
        model: 'departments',
        key: 'id',
      },
      type: Sequelize.UUID,
      field: 'department_id',
    });

    await queryInterface.addColumn('users', 'facility_id', {
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'id',
      },
      type: Sequelize.UUID,
      field: 'facility_id',
    });

    await queryInterface.addColumn('drugs', 'facility_id', {
      references: {
        model: 'facilities',
        key: 'id',
      },
      type: Sequelize.UUID,
      field: 'facility_id',
    });

    await queryInterface.addColumn('drugs', 'department_id', {
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id',
      },
      type: Sequelize.UUID,
      field: 'department_id',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('facilities');
    await queryInterface.dropTable('departments');
    await queryInterface.removeColumn('users', 'department_id');
    await queryInterface.removeColumn('users', 'facility_id');
    await queryInterface.removeColumn('drugs', 'facility_id');
    await queryInterface.removeColumn('drugs', 'department_id');
  },
};
