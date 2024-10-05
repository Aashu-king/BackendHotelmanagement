'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CheckIn', {
      checkInId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      reservationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Reservations', // Reference to Reservations table
          key: 'reservationId'
        },
        onDelete: 'CASCADE'
      },
      checkInTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      assignedRoomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rooms', // Reference to Rooms table
          key: 'roomId'
        },
        onDelete: 'CASCADE'
      },
      additionalRequests: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('CheckIn');
  }
};
