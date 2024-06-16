// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");
const getDb = require("../util/database.js").getDb;

class Product {
	constructor(title, price, description, imageUrl) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
	}

	save() {
		const db = getDb();
		return db.collection("products")
			.insertOne(this)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
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
