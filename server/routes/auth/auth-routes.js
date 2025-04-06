import express from "express";
import {
  loginUser,
  registerUser,
} from "../../controllers/auth/auth-controller.js";
export const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
