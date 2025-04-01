import express from "express";
import { registerUser } from "../../controllers/auth/auth-controller";
export const router = express.Router();

router.post("/register", registerUser);
