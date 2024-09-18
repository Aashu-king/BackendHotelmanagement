'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_permissions', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'userId',
        },
      },
      pageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'pages',
          key: 'pageId',
        },
      },
      canView: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      canEdit: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      canDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_permissions');
  },
};
