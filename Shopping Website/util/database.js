const Sequelize = require("sequelize");

const sequelize = new Sequelize("shopping-website", "root", "koushik123", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
