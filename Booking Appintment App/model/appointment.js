import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Appontment = sequelize.define("appointment", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	number: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export default Appontment;
