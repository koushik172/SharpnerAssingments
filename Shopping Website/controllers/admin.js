const Product = require("../models/product");
const mongodb = require("mongodb");

const objId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	Product({ title: title, price: price, description: description, imageUrl: imageUrl, userId: req.user._id })
		.save()
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			});
		})
		.catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const productId = req.params.productId;
	Product.findById(productId)
		.then((product) => {
			if (!product) return res.redirect("/");
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product,
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.id;
	const update = {
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description,
	};
	Product.findByIdAndUpdate(id, update)
		.then(res.redirect("/admin/products"))
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	let productId = req.body.id;
	Product.findByIdAndDelete(productId)
		.then(() => {
			return res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};
