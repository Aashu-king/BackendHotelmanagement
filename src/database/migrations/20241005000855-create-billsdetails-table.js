'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BillDetails', {
      billDetailId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      billId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bills', // Reference to Bills table
          key: 'billId'
        },
        onDelete: 'CASCADE'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable('BillDetails');
  }
};
