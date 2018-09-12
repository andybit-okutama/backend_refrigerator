var modelName = 'Items';
var db = require('../models');
var sequelize = db.sequelize;

const Items = db.items;
	  Op = db.Sequelize.Op;

exports.getAllItem = function(req,res) {
	res.status(200).send("get all");
}

exports.getOneItem = function(req,res) {
	res.status(200).send("get one");
}

exports.createItem = function(req,res) {
	res.status(200).send("create");
}

exports.updateItem = function(req,res) {
	res.status(200).send("update");
}

exports.deleteItem = function(req,res) {
	res.status(200).send("delete");
}