'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tables', {
      table_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      outletid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'outlets', 
          key: 'outletId',
        },
      },
      table_number: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      max_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Available', 'Reserved'),
        defaultValue: 'Available',
      },
      reservation_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reservation_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tables');
  }
};
