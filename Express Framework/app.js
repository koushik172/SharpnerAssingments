import express from "express";
import bodyParser from "body-parser";

const app = express();

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use("/", (req, res, next) => {
  res.status(404).send("<h2>Error! Page Not Found</h2>");
});

app.listen(3000);
console.log("http://localhost:3000");
