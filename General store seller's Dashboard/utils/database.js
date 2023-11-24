import Sequelize from "sequelize";

const sequelize = new Sequelize("general-store", "root", "koushik123", {
	dialect: "mysql",
	host: "localhost",
});

export default sequelize;
