'use strict';
module.exports = (sequelize, DataTypes) => {
  var buy_items = sequelize.define('buy_items', {
    qty: DataTypes.INTEGER,
    expire: DataTypes.DATE,
    is_active: { type:DataTypes.BOOLEAN, allowNull:false, defaultValue:true },
  }, {});
  buy_items.associate = function(models) {
    buy_items.belongsTo(models.Items, { foreignKey: 'id', as:'item' });
  };
  return buy_items;
};