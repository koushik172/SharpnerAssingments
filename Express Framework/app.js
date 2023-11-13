import path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootDirectory from "./helper/path.js";

const app = express();

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import contactRoutes from "./routes/contact.js";
import fromState from "./routes/formState.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDirectory, "public")));

app.use(adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);
app.use(fromState);

app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(rootDirectory, "views", "error.html"));
});

app.listen(3000);
console.log("http://localhost:3000");
