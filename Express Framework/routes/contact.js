import path from "path";

import express from "express";

import rootDirectory from "../helper/path.js";

const contactRoutes = express.Router();

contactRoutes.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "contact-us.html"));
});

contactRoutes.post("/contact-us", (req, res, next) => {
  console.log(req.body.name, req.body.email);
  res.redirect("/success");
});

export default contactRoutes;
