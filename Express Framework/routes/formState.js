import express from "express";

import { getSuccess } from "../controllers/fromController.js";

const fromState = express.Router();

fromState.get("/success", getSuccess);

export default fromState;
