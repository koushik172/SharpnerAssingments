import express from "express";

import { getContact, postContact } from "../controllers/contactController.js";

const contactRoutes = express.Router();

contactRoutes.get("/contact-us", getContact);

contactRoutes.post("/contact-us", postContact);

export default contactRoutes;
