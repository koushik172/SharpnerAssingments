import express from "express";

import { getProducts } from "../controllers/products.js";

const shopRoutes = express.Router();

shopRoutes.get("/", getProducts);

export default shopRoutes;
