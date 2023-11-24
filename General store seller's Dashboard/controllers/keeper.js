import Product from "../models/product.js";

export const addProduct = (req, res) => {
	Product.create({
		name: req.body.itemName,
		description: req.body.itemDescription,
		price: req.body.itemPrice,
		quantity: req.body.itemQuantity,
	})
		.then((result) => {
			res.json(result);
		})
		.catch((err) => console.log(err));
};

export const getProducts = (req, res) => {
	Product.findAll()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => console.log(err));
};

export const sellProduct = (req, res) => {
	Product.update(
		{
			name: req.body.itemName,
			description: req.body.itemDescription,
			price: req.body.itemPrice,
			quantity: req.body.itemQuantity,
		},
		{ where: { id: req.params.id } }
	)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => console.log(err));
};

export const addStock = (req, res) => {
	Product.update(
		{
			name: req.body.itemName,
			description: req.body.itemDescription,
			price: req.body.itemPrice,
			quantity: req.body.itemQuantity,
		},
		{ where: { id: req.params.id } }
	)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => console.log(err));
};

export const deleteProduct = (req, res) => {
	Product.destroy({ where: { id: req.params.id } })
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
};
