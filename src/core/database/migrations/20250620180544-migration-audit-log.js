'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('audit_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        field: 'user_id',
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tableName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'table_name',
      },
      recordId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'record_id',
      },
      before: {
        type: Sequelize.JSONB,
      },
      after: {
        type: Sequelize.JSONB,
      },
      description: {
        type: Sequelize.STRING,
      },
      ipAddress: {
        type: Sequelize.STRING,
        field: 'ip_address',
      },
      userAgent: {
        type: Sequelize.STRING,
        field: 'user_agent',
      },
      source: {
        type: Sequelize.STRING,
      },
      requestUrl: {
        type: Sequelize.STRING,
        field: 'request_url',
      },
      method: {
        type: Sequelize.STRING,
      },
      context: {
        type: Sequelize.STRING,
      },
      statusCode: {
        type: Sequelize.INTEGER,
        field: 'status_code',
      },
      correlationId: {
        type: Sequelize.STRING,
        field: 'correlation_id',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    });

    await queryInterface.addIndex('audit_logs', ['user_id']);
    await queryInterface.addIndex('audit_logs', ['action']);
    await queryInterface.addIndex('audit_logs', ['table_name']);
    await queryInterface.addIndex('audit_logs', ['record_id']);
    await queryInterface.addIndex('audit_logs', ['correlation_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('audit_logs');
  },
};
