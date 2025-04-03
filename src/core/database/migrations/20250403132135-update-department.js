'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'departments',
      'created_by_id',
      'create_by_id',
    );
    await queryInterface.addColumn('departments', 'created_by_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.renameColumn(
      'departments',
      'updated_by_id',
      'update_by_id',
    );
    await queryInterface.addColumn('departments', 'updated_by_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'departments',
      'departments_created_by_id_fkey',
    );
    await queryInterface.removeColumn('departments', 'created_by_id');
    await queryInterface.removeConstraint(
      'departments',
      'departments_updated_by_id_fkey',
    );
    await queryInterface.removeColumn('departments', 'updated_by_id');
  },
};
