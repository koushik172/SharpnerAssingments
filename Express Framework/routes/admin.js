import path from "path";

import express from "express";

import rootDirectory from "../helper/path.js";

const adminRoutes = express.Router();

adminRoutes.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "add-product.html"));
});

adminRoutes.post("/product", (req, res, next) => {
  console.log(req.body.title, req.body.size);
  res.redirect("/");
});

export default adminRoutes;
