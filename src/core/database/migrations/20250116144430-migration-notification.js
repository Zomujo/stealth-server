/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const baseModelColumns = require('../migration-base');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      ...baseModelColumns,
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      linkName: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'link_name',
      },
      linkRoute: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'link_route',
      },
      feature: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      facilityId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'facility_id',
        references: {
          model: 'facilities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      departmentId: {
        type: Sequelize.UUID,
        allowNull: true,
        field: 'department_id',
        references: {
          model: 'departments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeConstraint(
      'notifications',
      'notifications_facility_id_fkey',
    );
    await queryInterface.removeConstraint(
      'notifications',
      'notifications_department_id_fkey',
    );
    await queryInterface.dropTable('notifications');
  },
};
