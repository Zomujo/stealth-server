/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const baseModelColumns = require('../migration-base');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('login_sessions', {
      ...baseModelColumns,
      userId: {
        references: {
          model: 'users',
          key: 'id',
        },
        type: Sequelize.UUID,
        field: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      browser: Sequelize.STRING,

      location: Sequelize.STRING,

      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE',
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('login_sessions');
  },
};
