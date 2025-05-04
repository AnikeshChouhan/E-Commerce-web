import express from "express";
import {
  authMiddleWare,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/auth-controller.js";
export const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleWare, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user ",
    user,
  });
});
