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
	const product = new Product(title, price, description, imageUrl, null, req.user._id)
		.save()
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
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
	Product.fetchOne(productId)
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
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, price, description, imageUrl, new objId(id));
	product
		.save()
		.then(res.redirect("/admin/products"))
		.catch((err) => console.log(err));
};

// exports.getProducts = (req, res, next) => {
// 	req.user
// 		.getProducts()
// 		// Product.findAll()
// 		.then((products) => {
// 			res.render("admin/products", {
// 				prods: products,
// 				pageTitle: "Admin Products",
// 				path: "/admin//products",
// 			});
// 		})
// 		.catch((err) => console.log(err));
// };

exports.postDeleteProduct = (req, res, next) => {
	let productId = req.body.id;
	Product.delete(productId)
		.then(() => {
			return res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};
