/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const baseModelColumns = require('../migration-base');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suppliers', {
      ...baseModelColumns,
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      contact_person: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      info: Sequelize.TEXT,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('suppliers');
  },
};
