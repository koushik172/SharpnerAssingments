import Sequelize from "sequelize";

const sequelize = new Sequelize("appointments", "root", "koushik123", {
	dialect: "mysql",
	host: "localhost",
});

export default sequelize;
