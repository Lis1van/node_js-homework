import { Router } from "express";

import {
  forgotPassword,
  login,
  logout,
  logoutAll,
  refreshTokens,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshTokens);
router.post("/logout", authMiddleware, logout);
router.post("/logout-all", authMiddleware, logoutAll);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email/:token", verifyEmail);

export default router;
