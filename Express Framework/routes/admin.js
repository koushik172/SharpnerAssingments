import express from "express";

import { getAddProduct, postAddProduct } from "../controllers/products.js";

const adminRoutes = express.Router();

adminRoutes.get("/add-product", getAddProduct);

adminRoutes.post("/product", postAddProduct);

export default adminRoutes;
