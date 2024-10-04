'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      reservationId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      guestId: {
        type: Sequelize.INTEGER,
        references: { model: 'Guests', key: 'guestId' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      roomId: {
        type: Sequelize.INTEGER,
        references: { model: 'Rooms', key: 'roomId' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      reservationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkInDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      specialRequests: {
        type: Sequelize.TEXT,
        allowNull: true,
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
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  },
};
