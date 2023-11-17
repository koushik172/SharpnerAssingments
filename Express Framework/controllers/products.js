import path from "path";
import rootDirectory from "../helper/path.js";

export const getAddProduct = (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "add-product.html"));
};

export const postAddProduct = (req, res, next) => {
  console.log(req.body.title, req.body.size);
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "shop.html"));
};
