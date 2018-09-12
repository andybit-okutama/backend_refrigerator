var modelName = 'Items';
var db = require('../models');
var sequelize = db.sequelize;

const Items = db.Items;
	  Op = db.Sequelize.Op;


exports.findAll = function(req,res) {
	sequelize.transaction((t) => {
		return findAllItems( t, (result) => {
			if (result.success == true) {
				res.status(200).send(result.data);
			} else {
				res.status(500).send(result);
			}
		});
	});
}

exports.findOne = function(req,res) {
	sequelize.transaction((t) => {
		return findOneItems(req.params.id, t, (result) => {
			if (result.success == true) {
				res.status(200).send(result.data);
			} else {
				res.status(500).send(result);
			}
		});
	});
}

exports.create = function(req,res) {
		req.checkBody('name', 'Name is required!').notEmpty();
		req.checkBody('barcode', 'Barcode is required!').notEmpty();
		req.checkBody('description', 'Description is required!').notEmpty();

		var errors = req.validationErrors();

		if (errors) {
			res.status(500).json({ errors: errors });
		} else {
			sequelize.transaction((t) => {
				return createItems(req.body, t, (result) => {
					if (result.success == true) {
						res.status(200).send(result.items)
					} else {
						res.status(500).send(result);
					}
				})
			})
		}

}

exports.update = function(req,res) {
		req.checkBody('name', 'Name is required!').notEmpty();
		req.checkBody('barcode', 'Barcode is required!').notEmpty();
		req.checkBody('description', 'Description is required!').notEmpty();

		var errors = req.validationErrors();

		if (errors) {
			res.status(500).json({ errors: errors });
		} else {
			sequelize.transaction((t) => {
				return updateItems(req.body, req.params, t, (result) => {
					if (result.success == true) {
						res.status(200).send(result)
					} else {
						res.status(500).send(result);
					}
				})
			})
		}
}

exports.delete = function(req,res) {
	sequelize.transaction((t) => {
		return deleteItems(req.params.id, t, (result) => {
			if (result.success == true) {
				res.status(200).send(result)
			} else {
				res.status(500).send(result);
			}
		})
	})
}



/* ========================================= Main CRUD =========================================*/
findOneItems = function(id, t, callback) {
	return Items.findOne(
	{
		where:{
			id:id,	
			is_active:true
		}
	},
	{
		transaction:t
	})
	.then((items) => {
		if (items) {
			return callback({ success:true, data:items });
		} else {
			return callback({ success:false, msg:modelName+' not found!' });
		}
	})
	.catch((err) => {
		// console.log(err);
		// throw err;
		return callback({ success:false, msg:err });
	});
}

findAllItems = function(t, callback) {
	return Items.findAll(
	{
		where:{
			is_active:true
		}
	},
	{
		transaction:t
	})
	.then((items) => {
		if (items) {
			return callback({ success:true, data:items });
		} else {
			return callback({ success:false, msg:modelName+' not found!' });
		}
	})
	.catch((err) => {
		// console.log(err);
		// throw err;
		return callback({ success:false, msg:err });
	});
}

createItems = function(data, t, callback) {
	return Items.create({
		name: data.name,
		barcode: data.barcode,
		description: data.description
	},
	{
		transaction:t
	})
	.then((items) => {
		return callback({ success:true, items:items });
	})
	.catch((err) => {
		return callback({ success:false, msg:'Something went wrong: '+err });
	})
}


updateItems = function(data, params, t, callback) {
	return Items.update({
		name: data.name,
		barcode: data.barcode,
		description: data.description

	},
	{
		where: {
			id:params.id,
			is_active:true
		}
	},
	{
		transaction:t
	})
	.then((items) => {
		if (items > 0) {
			return callback({ success:true, msg:modelName+' successfully updated!' });
		} else {
			return callback({ success:false, msg:modelName+' not found!' });
		}
	})
	.catch((err) => {
		// console.log(err);
		// throw err;
		return callback({ success:false, msg:'Something went wrong: '+err });
	})
}

deleteItems = function(id, t, callback) {
	console.log(id);
	return Items.update(
	{
		is_active: false
	},
	{
		where: {
			id:id,
			is_active:true
		}
	},
	{
		transaction:t
	})
	.then((items) => {
		return callback({ success:true, msg:modelName+' successfully deleted!' });
	})
	.catch((err) => {
		// console.log(err);
		// throw err;
		return callback({ success:false, msg:'Something went wrong: '+err });
	})
}