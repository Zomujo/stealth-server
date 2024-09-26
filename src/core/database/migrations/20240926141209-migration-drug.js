'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('drugs', 'strength', { type: Sequelize.STRING, allowNull: false })
    await queryInterface.addColumn('drugs', 'unit_of_measurement', {type: Sequelize.STRING, allowNull: false})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('drugs', 'strength');
    await queryInterface.removeColumn('drugs', 'unit_or_measurement')
  }
};
