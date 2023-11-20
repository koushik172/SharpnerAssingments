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
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(router);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
	res.sendFile("/index.html");
});

sequelize
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running at http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
