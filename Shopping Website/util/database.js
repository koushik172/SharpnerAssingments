// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("shopping-website", "root", "koushik123", {
// 	dialect: "mysql",
// 	host: "localhost",
// });

// module.exports = sequelize;

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
require("dotenv").config();

let _db;

const mongoConnect = (cb) => {
	mongoClient
		.connect(`mongodb+srv://koushik62:${process.env.MONGO_PASSWORD}@cluster0.st9gmr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
		.then((client) => {
			console.log("Connection successful");
			_db = client.db();
			cb();
		})
		.catch((err) => console.log(err));
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "Database not connected!";
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
