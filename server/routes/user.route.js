import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
    getUser,
    registerUser,
    loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
