module.exports = function(app) {
	const items = require('../controllers/buyItems.controllers');
	const url = '/buy_items';

	//Create items by CSV
	app.get(url+'', items.findAll);

	//Create items by CSV
	app.get(url+'/:id', items.findOne);

	//Create items by CSV
	app.post(url+'', items.create);

	//Create items by CSV
	app.put(url+'/:id', items.update);

	//Create items by CSV
	app.delete(url+'/:id', items.delete);

}