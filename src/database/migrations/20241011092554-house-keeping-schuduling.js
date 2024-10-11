'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cleaning', {
      shiftId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      roomId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Rooms',
          key: 'roomId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      startTime: {
        type: Sequelize.TIME
      },
      endTime: {
        type: Sequelize.TIME
      },
      shiftDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cleaning');
  }
};
