'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      guestId: {
        type: Sequelize.INTEGER,
        references: { model: 'Guests', key: 'guestId' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      outletid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'outlets', 
          key: 'outletId',
        },
      },
      order_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      order_status: {
        type: Sequelize.ENUM('Pending', 'In Progress', 'Delivered', 'Completed'),
        allowNull: false
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      is_room_service: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
