module.exports = function(app) {
	const items = require('../controllers/buyItems.controllers');
	const url = '/buy_items';

	//Create items by CSV
	app.get(url+'', items.getAllBuyItem);

	//Create items by CSV
	app.get(url+'/:id', items.getOneBuyItem);

	//Create items by CSV
	app.post(url+'', items.createBuyItem);

	//Create items by CSV
	app.put(url+'/:id', items.updateBuyItem);

	//Create items by CSV
	app.delete(url+'/:id', items.deleteBuyItem);

}