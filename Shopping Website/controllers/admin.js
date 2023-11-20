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
	const product = new Product(null, title, imageUrl, description, price);
	product
		.save()
		.then(res.redirect("/"))
		.catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const productId = req.params.productId;

	Product.findById(productId)
		.then(([product]) => {
			if (!product) return res.redirect("/");
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product[0],
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const productId = req.body.id;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const updatedProduct = {
		id: productId,
		title: title,
		imageUrl: imageUrl,
		description: description,
		price: price,
	};
	Product.editProduct(updatedProduct)
		.then(res.redirect("/admin/products"))
		.catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(([products]) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin//products",
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	let productId = req.body.id;
	Product.deleteproductbyID(productId)
		.then(res.redirect("/admin/products"))
		.catch((err) => console.log(err));
};
