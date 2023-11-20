const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "shopping-website",
	password: "koushik123",
});

module.exports = pool.promise();
