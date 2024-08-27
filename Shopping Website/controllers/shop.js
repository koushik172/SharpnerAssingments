const Product = require("../models/product");
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.find()
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
	Product.findById(productId)
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
		let products = await Product.find();
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
	Product.findById(productId)
		.then((product) => {
			req.user.addProductToCart(product);
		})
		.then((result) => {
			res.redirect("/cart");
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	req.user.deleteProductFromCart(productId);
	res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
	req.user.getOrders().then((orders) => {
		res.render("shop/orders", {
			path: "/orders",
			pageTitle: "Your Orders",
			orders: orders,
		});
	});
};

exports.postOrder = (req, res, next) => {
	req.user
		.addOrder()
		.then(() => {
			res.redirect("/orders");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
