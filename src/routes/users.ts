import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/usersController";
import { validateUser } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/", getUsers);
router.post("/", validateUser, createUser);
router.put("/:userId", validateUser, updateUser);
router.delete("/:userId", deleteUser);

export default router;
