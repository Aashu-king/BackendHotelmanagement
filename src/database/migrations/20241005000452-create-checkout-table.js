'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CheckOut', {
      checkOutId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      checkInId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CheckIn', // Reference to CheckIn table
          key: 'checkInId'
        },
        onDelete: 'CASCADE'
      },
      checkOutTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      finalBillAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      paymentStatus: {
        type: Sequelize.ENUM('paid', 'unpaid'),
        allowNull: false
      },
      outletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'outlets', // refers to table name
          key: 'outletId',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CheckOut');
  }
};
