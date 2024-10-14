'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TableReservations', {
      reservation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      guestId: {
        type: Sequelize.INTEGER,
        references: { model: 'Guests', key: 'guestId' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      
      table_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tables',
          key: 'table_id',
        },
      },
      reservation_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      reservation_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Confirmed', 'Cancelled', 'Completed'),
        defaultValue: 'Confirmed',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TableReservations');
  }
};
