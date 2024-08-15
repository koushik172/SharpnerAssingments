const mongodb = require("mongodb");
const getDb = require("../util/database.js").getDb;

class User {
	constructor(id, name, email, cart) {
		this._id = id;
		this.name = name;
		this.email = email;
		this.cart = cart;
	}

	addUser() {
		const db = getDb();
		let user = db.collection("users").insertOne(this);
		return user;
	}

	addProductToCart(product) {
		const cartProductIndex = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() === product._id.toString();
		});

		let newQuantity = 1;
		const updatedCartItems = [...this.cart.items];

		if (cartProductIndex >= 0) {
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
		}

		const updatedCart = { items: updatedCartItems };

		const db = getDb();
		return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
	}

	getCart() {
		const db = getDb();
		const productIds = this.cart.items.map((i) => {
			return i.productId;
		});
		return db
			.collection("products")
			.find({ _id: { $in: productIds } })
			.toArray()
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
	}

	removeProductFromCart(product) {
		console.log("REMOVE REQ");

		const cartProductIndex = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() === product._id.toString();
		});

		let newQuantity;
		const updatedCartItems = [...this.cart.items];

		if (cartProductIndex >= 0) {
			if (this.cart.items[cartProductIndex].quantity === 1) {
				updatedCartItems.pop(cartProductIndex);
			} else if (this.cart.items[cartProductIndex].quantity > 1) {
				newQuantity = this.cart.items[cartProductIndex].quantity - 1;
				updatedCartItems[cartProductIndex].quantity = newQuantity;
			}
		}

		const updatedCart = { items: updatedCartItems };

		console.log("DELETEING");

		const db = getDb();
		return db.collection("users").updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
	}

	static async findUserById(user_id) {
		const db = getDb();
		let user = await db
			.collection("users")
			.find({ _id: new mongodb.ObjectId(user_id) })
			.next()
			.then((user) => {
				return user;
			})
			.catch((err) => {
				console.log(err);
			});

		return user;
	}
}

module.exports = User;
