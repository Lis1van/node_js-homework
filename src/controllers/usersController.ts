import { Request, Response } from "express";

import { IUser } from "../types";
import { readUsers, writeUsers } from "../utils/userHelpers";

export const getUsers = (req: Request, res: Response) => {
  try {
    const users = readUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createUser = (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const users = readUsers();
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser: IUser = { id, name, email, password };

    users.push(newUser);
    writeUsers(users);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { name, email, password } = req.body;
    const users = readUsers();

    const userIndex = users.findIndex((user: IUser) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).send("Пользователь не найден.");
    }

    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].password = password;

    writeUsers(users);
    res.status(200).send(users[userIndex]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const users = readUsers();

    const userIndex = users.findIndex((user: IUser) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).send("Пользователь не найден.");
    }

    users.splice(userIndex, 1);
    writeUsers(users);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
