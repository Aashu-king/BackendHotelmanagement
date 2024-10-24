'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('RoomRates', 'outletId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'outlets', 
        key: 'outletid', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RoomRates', 'outletId');
  },
};
