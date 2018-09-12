var modelName = 'buyItems';
var db = require('../models');
var sequelize = db.sequelize;

const buyItems = db.buy_items;
	  Op = db.Sequelize.Op;

exports.findAll = function(req,res) {
	res.status(200).send("get all");
}

exports.findOne = function(req,res) {
	res.status(200).send("get one");
}

exports.create = function(req,res) {
	res.status(200).send("create");
}

exports.update = function(req,res) {
	res.status(200).send("update");
}

exports.delete = function(req,res) {
	res.status(200).send("delete");
}