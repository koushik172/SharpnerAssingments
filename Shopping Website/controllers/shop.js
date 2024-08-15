const Product = require("../models/product");
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			});
		})
		.catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.fetchOne(productId)
		.then((product) => {
			res.render("shop/product-detail", {
				product: product,
				pageTitle: product.title,
				path: "/products",
			});
		})
		.catch((err) => console.log(err));
};

exports.getIndex = async (req, res, next) => {
	try {
		let products = await Product.fetchAll();
		console.log(products);
		res.render("shop/index", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((products) => {
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: products,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.fetchOne(productId)
		.then((product) => {
			req.user.addProductToCart(product);
		})
		.then((result) => {
			// console.log(result, "CART UPDATE");
			res.redirect("/cart");
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	Product.fetchOne(productId)
		.then((product) => {
			req.user.removeProductFromCart(product);
		})
		.then((result) => {
			res.redirect("/cart");
		});
};

exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders",
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
