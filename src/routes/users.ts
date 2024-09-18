import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/usersController";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middlewares/validationMiddleware";

const router = Router();

router.get("/", getUsers);

router.post("/", validateCreateUser, createUser);

router.put("/:userId", validateUpdateUser, updateUser);

router.delete("/:userId", deleteUser);

export default router;
