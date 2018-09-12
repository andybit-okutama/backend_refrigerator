module.exports = function(app) {
	const items = require('../controllers/items.controllers');
	const url = '/items';

	//Create items by CSV
	app.get(url+'', items.getAllItem);

	//Create items by CSV
	app.get(url+'/:id', items.getOneItem);

	//Create items by CSV
	app.post(url+'', items.createItem);

	//Create items by CSV
	app.put(url+'/:id', items.updateItem);

	//Create items by CSV
	app.delete(url+'/:id', items.deleteItem);

}