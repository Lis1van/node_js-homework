import { Router } from "express";

import {
  login,
  logout,
  logoutAll,
  refreshTokens,
  register,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshTokens);
router.post("/logout", authMiddleware, logout);
router.post("/logout-all", authMiddleware, logoutAll);

export default router;
