import express from "express";

import * as keeper from "../controllers/keeper.js";

const router = express.Router();

router.post("/addAppointments", keeper.addAppointment);

router.get("/getAppointments", keeper.getAppointments);

router.delete("/deleteAppointments/:id", keeper.deleteAppointments);

export default router;
