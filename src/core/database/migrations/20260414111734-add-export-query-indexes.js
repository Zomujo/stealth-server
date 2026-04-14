'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // audit_logs: composite index for facility_id + created_at range filter (used in 3 queries)
    await queryInterface.addIndex('audit_logs', ['facility_id', 'created_at'], {
      name: 'idx_audit_logs_facility_created',
    });

    // audit_logs: department join filter
    await queryInterface.addIndex('audit_logs', ['department_id']);

    // audit_logs: description filter used in CASE WHEN aggregations
    await queryInterface.addIndex('audit_logs', ['description']);

    // users: facility join + WHERE filter in general data query
    await queryInterface.addIndex('users', ['facility_id']);

    // users: department join in general data query
    await queryInterface.addIndex('users', ['department_id']);

    // batches: composite index for facility_id + created_at range filter
    await queryInterface.addIndex('batches', ['facility_id', 'created_at'], {
      name: 'idx_batches_facility_created',
    });

    // batches: department join in total quantity query
    await queryInterface.addIndex('batches', ['department_id']);
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      'audit_logs',
      'idx_audit_logs_facility_created',
    );
    await queryInterface.removeIndex('audit_logs', ['department_id']);
    await queryInterface.removeIndex('audit_logs', ['description']);

    await queryInterface.removeIndex('users', ['facility_id']);
    await queryInterface.removeIndex('users', ['department_id']);

    await queryInterface.removeIndex('batches', 'idx_batches_facility_created');
    await queryInterface.removeIndex('batches', ['department_id']);
  },
};
