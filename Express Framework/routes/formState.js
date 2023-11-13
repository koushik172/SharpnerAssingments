import path from "path";

import express from "express";

import rootDirectory from "../helper/path.js";

const fromState = express.Router();

fromState.get("/success", (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "success.html"));
});

export default fromState;
