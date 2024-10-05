'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bills', {
      billId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      guestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Guests', // Reference to Guests table
          key: 'guestId'
        },
        onDelete: 'CASCADE'
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.ENUM('credit card', 'cash', 'online'),
        allowNull: false
      },
      status: {
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
    await queryInterface.dropTable('Bills');
  }
};
