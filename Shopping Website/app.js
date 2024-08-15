const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");

const User = require("./models/user");

const app = express();
const port = 3000;

const mongoConnect = require("./util/database").mongoConnect;

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findUserById("66a3d982fcb510de4700182b")
		.then((user) => {
			req.user = new User(user._id, user.name, user.email, user.cart);
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

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);

// User.hasOne(Cart);
// Cart.belongsTo(User);

// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });

// sequelize
// 	// .sync({ force: true })
// 	.sync()
// 	.then((res) => {
// 		return User.findByPk(1);
// 	})
// 	.then((user) => {
// 		if (!user) {
// 			User.create({ name: "Koushik", email: "koushik@gmail.com" });
// 		}
// 		return user;
// 	})
// 	.then((user) => {
// 		return user.createCart();
// 	})
// 	.then(() => {
// 		app.listen(3000);
// 		console.log("http://localhost:3000");
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

mongoConnect(() => {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
});
