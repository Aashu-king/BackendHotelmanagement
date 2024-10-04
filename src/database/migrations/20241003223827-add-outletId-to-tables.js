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

    await queryInterface.addColumn('Rooms', 'outletId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'outlets',
        key: 'outletid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Guests', 'outletId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'outlets',
        key: 'outletid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('RoomTypes', 'outletId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'outlets',
        key: 'outletid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Reservations', 'outletId', {
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
    await queryInterface.removeColumn('Rooms', 'outletId');
    await queryInterface.removeColumn('Guests', 'outletId');
    await queryInterface.removeColumn('RoomTypes', 'outletId');
    await queryInterface.removeColumn('Reservations', 'outletId');
  },
};
