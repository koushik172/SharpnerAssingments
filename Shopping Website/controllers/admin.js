const Product = require("../models/product");

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
	Product.create({
		title: title,
		imageUrl: imageUrl,
		price: price,
		description: description,
	})
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const productId = req.params.productId;

	Product.findByPk(productId)
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
	Product.update(
		{
			title: title,
			imageUrl: imageUrl,
			price: price,
			description: description,
		},
		{ where: { id: id } }
	)
		.then(res.redirect("/admin/products"))
		.catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin//products",
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	let id = req.body.id;
	Product.destroy({ where: { id: id } })
		.then(res.redirect("/admin/products"))
		.catch((err) => console.log(err));
};
