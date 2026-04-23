'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('patients', 'diagnosis', {
      type: Sequelize.TEXT,
    });

    await queryInterface.addColumn('patients', 'gender', {
      type: Sequelize.TEXT,
    });

    await queryInterface.addColumn('patients', 'weight', {
      type: Sequelize.DOUBLE,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('patients', 'diagnosis');
    await queryInterface.removeColumn('patients', 'gender');
    await queryInterface.removeColumn('patients', 'weight');
  },
};
