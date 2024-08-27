const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	cart: {
		items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, quantity: { type: Number, required: true } }],
	},
});

userSchema.methods.addProductToCart = function (product) {
	let cartProductIndex;
	let newQuantity = 1;
	let updatedCartItems;

	if (this.cart.items !== undefined) {
		cartProductIndex = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() === product._id.toString();
		});
		updatedCartItems = [...this.cart.items];
	} else {
		cartProductIndex = undefined;
		updatedCartItems = [];
	}

	if (cartProductIndex >= 0) {
		newQuantity = this.cart.items[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQuantity;
	} else {
		updatedCartItems.push({ productId: product._id, quantity: newQuantity });
	}

	this.cart = { items: updatedCartItems };
	return this.save();
};

userSchema.methods.getCart = async function () {
	let productIds;
	if (this.cart.items !== undefined) {
		productIds = this.cart.items.map((i) => {
			return i.productId;
		});
	} else {
		productIds = [];
	}

	return mongoose
		.model("Product")
		.find({ _id: { $in: productIds } })
		.then((products) => {
			return products.map((p) => {
				return {
					...p,
					quantity: this.cart.items.find((i) => {
						return i.productId.toString() === p._id.toString();
					}).quantity,
				};
			});
		});
};

userSchema.methods.deleteProductFromCart = function (productId) {
	this.cart.items.pull({ productId: productId });
	this.save();
};

module.exports = mongoose.model("User", userSchema);
