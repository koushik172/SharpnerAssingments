// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");
const mongodb = require("mongodb");
const getDb = require("../util/database.js").getDb;

class Product {
	constructor(title, price, description, imageUrl, id) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id;
	}

	save() {
		const db = getDb();
		let dbOp;
		if (this._id) {
			console.log("Updating");
			dbOp = db.collection("products").updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
		} else {
			dbOp = db.collection("products").insertOne(this);
		}
		return dbOp.then((res) => console.log(res)).catch((err) => console.log(err));
	}

	static async fetchAll() {
		const db = getDb();
		let products = await db
			.collection("products")
			.find()
			.toArray()
			.then((products) => {
				return products;
			})
			.catch((err) => console.log(err));
		return products;
	}

	static async fetchOne(product_id) {
		const db = getDb();
		let product = await db
			.collection("products")
			.find({ _id: new mongodb.ObjectId(product_id) })
			.next()
			.then((product) => {
				return product;
			})
			.catch((err) => console.log(err));

		return product;
	}

	static async delete(product_id) {
		const db = getDb();
		await db
			.collection("products")
			.deleteOne({ _id: new mongodb.ObjectId(product_id) })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

// const Product = sequelize.define("product", {
// 	id: {
// 		type: Sequelize.INTEGER,
// 		autoIncrement: true,
// 		allowNull: false,
// 		primaryKey: true,
// 	},
// 	title: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	price: {
// 		type: Sequelize.DOUBLE,
// 		allowNull: false,
// 	},
// 	description: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// 	imageUrl: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},
// });

module.exports = Product;
