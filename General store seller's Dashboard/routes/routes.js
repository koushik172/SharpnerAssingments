import express from "express";

import * as keeper from "../controllers/keeper.js";

const router = express.Router();

router.post("/addProduct", keeper.addProduct);

router.get("/getProducts", keeper.getProducts);

router.patch("/sellProduct/:id", keeper.sellProduct);

router.patch("/addStock/:id", keeper.sellProduct);

router.delete("/deleteProduct/:id", keeper.deleteProduct);

export default router;
