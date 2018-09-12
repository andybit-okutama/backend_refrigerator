'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('buy_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      expire_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue:""
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
      },      
      item_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { 
          model: 'items',
          key: 'id'
        }
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('buy_items');
  }
};