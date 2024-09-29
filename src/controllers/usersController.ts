import { Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services/userService";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const { name, email, password } = req.body;
    const updateData: Partial<IUser> = {
      ...(name && { name }), // Добавляем поле, если оно существует
      ...(email && { email }), // Аналогично для email
      ...(password && { password }), // Аналогично для пароля
    };

    const updatedUser = await userService.updateUser(userId, updateData);

    if (!updatedUser) {
      return res.status(404).send("Пользователь не найден.");
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const isDeleted = await userService.deleteUser(userId);

    if (!isDeleted) {
      return res.status(404).send("Пользователь не найден.");
    }

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
