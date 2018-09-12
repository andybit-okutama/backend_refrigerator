'use strict';
module.exports = (sequelize, DataTypes) => {
  var buy_items = sequelize.define('buy_items', {
    qty: DataTypes.INTEGER
  }, {});
  buy_items.associate = function(models) {
  	ProbeProfile.belongsTo(models.items, { foreignKey: 'id' , as:'item'  });
  };
  return buy_items;
};