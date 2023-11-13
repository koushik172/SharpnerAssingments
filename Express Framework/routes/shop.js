import path from "path";

import express from "express";

import rootDirectory from "../helper/path.js";

const shopRoutes = express.Router();

shopRoutes.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "shop.html"));
});

export default shopRoutes;
