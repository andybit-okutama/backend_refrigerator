var modelName = 'buyItems';
var db = require('../models');
var sequelize = db.sequelize;

const buyItems = db.buy_items;
	  Op = db.Sequelize.Op;

exports.getAllBuyItem = function(req,res) {
	res.status(200).send("get all");
}

exports.getOneBuyItem = function(req,res) {
	res.status(200).send("get one");
}

exports.createBuyItem = function(req,res) {
	res.status(200).send("create");
}

exports.updateBuyItem = function(req,res) {
	res.status(200).send("update");
}

exports.deleteBuyItem = function(req,res) {
	res.status(200).send("delete");
}