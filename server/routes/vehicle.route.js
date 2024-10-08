import express from "express";
import { listVehicles, getVehicle } from "../controllers/vehiclesController.js";

const router = express.Router();

router.get("/", listVehicles);
router.get("/:id", getVehicle);

export default router;
