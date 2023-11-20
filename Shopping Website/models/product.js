const Cart = require("./cart");

const db = require("../util/database");

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		return db.execute(
			"INSERT INTO products(title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
			[this.title, this.price, this.imageUrl, this.description]
		);
	}

	static editProduct(updatedProduct) {
		return db.execute(
			"UPDATE products SET products.title = ?, products.imageUrl = ?, products.description = ?, products.price = ? WHERE id = ?",
			[
				updatedProduct.title,
				updatedProduct.imageUrl,
				updatedProduct.description,
				updatedProduct.price,
				updatedProduct.id,
			]
		);
	}

	static deleteproductbyID(id) {
		return db.execute("DELETE FROM products WHERE id = ?;", [id]);
	}

	static fetchAll() {
		return db.execute("SELECT * FROM products");
	}

	static findById(id) {
		return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
	}
};
