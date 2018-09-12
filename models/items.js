'use strict';
module.exports = (sequelize, DataTypes) => {
  var Items = sequelize.define('Items', {
    name: DataTypes.STRING,
    barcode: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Items.associate = function(models) {
    Items.hasMany( models.buy_items, { as: 'buy_item' } );
  };
  return Items;
};