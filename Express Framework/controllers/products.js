import path from "path";
import rootDirectory from "../helper/path.js";

import { Product } from "../models/product.js";

export const getAddProduct = (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "add-product.html"));
  let data = Product.fetchAll();
  console.log(data);
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.size);
  product.save();
  let products = Product.fetchAll();
  console.log(products);
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "shop.html"));
};
