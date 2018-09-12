var modelName = 'buyItems';
var db = require('../models');
var sequelize = db.sequelize;

const buyItems = db.buy_items;
	  Op = db.Sequelize.Op;

exports.findAll = function(req,res) {
	sequelize.transaction((t) => {
		return findAllBuyItems( t, (result) => {
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
		return findOneBuyItems( req.params.id, t, (result) => {
			if (result.success == true) {
				res.status(200).send(result.data);
			} else {
				res.status(500).send(result);
			}
		});
	});
}

exports.create = function(req,res) {
	req.checkBody('qty', 'Qty is required!').notEmpty();
	req.checkBody('expire_date', 'Expire Date is required!').notEmpty();
	req.checkBody('item_id', 'Item id is required!').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.status(500).json({ errors: errors });
	} else {
		sequelize.transaction((t) => {
			return createBuyItems(req.body, t, (result) => {
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
		req.checkBody('qty', 'Qty is required!').notEmpty();
		req.checkBody('expire_date', 'Expire Date is required!').notEmpty();
		req.checkBody('item_id', 'Item id is required!').notEmpty();

		var errors = req.validationErrors();

		if (errors) {
			res.status(500).json({ errors: errors });
		} else {
			sequelize.transaction((t) => {
				return updateBuyItems(req.body, req.params, t, (result) => {
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
		return deleteBuyItems(req.params.id, t, (result) => {
			if (result.success == true) {
				res.status(200).send(result)
			} else {
				res.status(500).send(result);
			}
		})
	})
}

/* ========================================= Main CRUD =========================================*/
findOneBuyItems = function(id, t, callback) {
	return buyItems.findOne(
	{
		where:{
			id:id,	
			is_active:true
		},
		include: [
			{
				model: db.Items,
				as: 'item'
			}
		]
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

findAllBuyItems = function(t, callback) {
	return buyItems.findAll(
	{
		where:{
			is_active:true
		},
		include: [
			{
				model: db.Items,
				as: 'item'
			}
		]
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

createBuyItems = function(data, t, callback) {
	return buyItems.create({
		qty: data.qty,
		expire_date: data.expire_date,
		item_id: data.item_id
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


updateBuyItems = function(data, params, t, callback) {
	return buyItems.update({
		qty: data.qty,
		expire: data.expire,
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

deleteBuyItems = function(id, t, callback) {
	return buyItems.update(
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