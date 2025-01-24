'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.renameColumn(
      'patients',
      'created_by',
      'created_by_id',
    );
    await queryInterface.renameColumn('items', 'created_by', 'created_by_id');
    await queryInterface.renameColumn('batches', 'created_by', 'created_by_id');
    await queryInterface.renameColumn(
      'stock_adjustments',
      'created_by',
      'created_by_id',
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.renameColumn(
      'patients',
      'created_by_id',
      'created_by',
    );
    await queryInterface.renameColumn('items', 'created_by_id', 'created_by');
    await queryInterface.renameColumn('batches', 'created_by_id', 'created_by');
    await queryInterface.renameColumn(
      'stock_adjustments',
      'created_by_id',
      'created_by',
    );
  },
};
