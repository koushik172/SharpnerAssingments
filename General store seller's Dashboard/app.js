import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import express from "express";
import cors from "cors";

import sequelize from "./utils/database.js";
import router from "./routes/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
	res.sendFile("/index.html");
});

sequelize
	.sync()
	.then(() => {
		app.listen(3000, () => {
			console.log(`http://localhost:3000`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
