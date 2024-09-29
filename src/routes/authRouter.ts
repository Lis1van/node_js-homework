import { Router } from "express";

import {
  changePassword,
  forgotPassword,
  login,
  logout,
  logoutAll,
  refreshTokens,
  register,
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
router.post("/change-password", authMiddleware, changePassword);
router.post("/verify-email", verifyEmail);

export default router;
