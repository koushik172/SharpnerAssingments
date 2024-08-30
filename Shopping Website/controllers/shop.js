const Product = require("../models/product");
const Order = require("../models/order");
const product = require("../models/product");
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
		.populate("cart.items.productId")
		.then((user) => {
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: user.cart.items,
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
	Order.find({ userId: req.user._id }).then((orders) => {
		console.log(orders[0].items);
		res.render("shop/orders", {
			path: "/orders",
			pageTitle: "Your Orders",
			orders: orders,
		});
	});
};

exports.postOrder = (req, res, next) => {
	req.user.populate("cart.items.productId").then((user) => {
		const products = user.cart.items.map((product) => {
			return { product: { ...product.productId._doc }, quantity: product.quantity };
		});

		Order({ items: products, userId: req.user._id })
			.save()
			.then(() => {
				req.user.cart.items = [];
				req.user.save();
			})
			.then(() => {
				res.redirect("/orders");
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
