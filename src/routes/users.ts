import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/usersController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { userSchema } from "../validators/userValidator";

const router = Router();

router.get("/", getUsers);

router.post("/", validateRequest(userSchema), createUser);

router.put("/:userId", validateRequest(userSchema), updateUser);

router.delete("/:userId", deleteUser);

export default router;
