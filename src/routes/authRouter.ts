import { Router } from "express";

import { login, refreshTokens, register } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshTokens);

export default router;
