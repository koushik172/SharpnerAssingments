const mongodb = require("mongodb");
const getDb = require("../util/database.js").getDb;

class User {
	constructor(id, name, email) {
		this._id = id;
		this.name = name;
		this.email = email;
	}

	addUser() {
		const db = getDb();
		let user = db.collection("users").insertOne(this);
		return user;
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
