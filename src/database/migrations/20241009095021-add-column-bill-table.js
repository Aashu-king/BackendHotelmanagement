'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bills', 'reservationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Reservations', 
        key: 'reservationId', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RoomRates', 'outletId');
  },
};
