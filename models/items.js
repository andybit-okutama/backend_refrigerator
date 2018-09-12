'use strict';
module.exports = (sequelize, DataTypes) => {
  var Items = sequelize.define('Items', {
    name: DataTypes.STRING,
    barcode: DataTypes.STRING,
    description: DataTypes.STRING,
    is_active: { type:DataTypes.BOOLEAN, allowNull:false, defaultValue:true },
  }, {});
  Items.associate = function(models) {
    Items.hasMany( models.buy_items, { as: 'buy_item' } );
  };
  return Items;
};