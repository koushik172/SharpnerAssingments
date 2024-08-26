const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findById("66cc586664f898e97ebfc5bb")
		.then((user) => {
			req.user = user;
			console.log(req.user);
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

async function main() {
	await mongoose
		.connect(
			`mongodb+srv://koushik62:${process.env.MONGO_PASSWORD}@cluster0.st9gmr0.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`
		)
		.then(() => {
			User.findOne().then((user) => {
				if (!user) {
					const user = new User({
						name: "koush",
						email: "koush@test.com",
						cart: { items: [] },
					});
					user.save();
				}
			});

			app.listen(port, () => {
				console.log(`Server is running on http://localhost:${port}`);
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

main().catch((err) => console.log(err));
