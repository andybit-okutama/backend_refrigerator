'use strict';
module.exports = (sequelize, DataTypes) => {
  var buy_items = sequelize.define('buy_items', {
    qty: DataTypes.INTEGER
  }, {});
  buy_items.associate = function(models) {
    buy_items.belongsTo(models.Items, { foreignKey: 'id', as:'item' });
  };
  return buy_items;
};