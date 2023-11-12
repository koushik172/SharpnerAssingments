import express from "express";

const shopRoutes = express.Router();

shopRoutes.get("/", (req, res, next) => {
  res.send("<h1>Helloooo</h1>");
});

export default shopRoutes;
