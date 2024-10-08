'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ReservationTimes', {
      reservationTimeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reservationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Reservations', 
          key: 'reservationId', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fromDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fromTime: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: '10:00:00',
      },
      toDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      toTime: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: '09:00:00',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ReservationTimes');
  }
};
