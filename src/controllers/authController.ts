import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { PasswordService } from "../services/passwordService";
import { TokenService } from "../services/tokenService";
import { UserService } from "../services/userService";

const userService = new UserService();
const passwordService = new PasswordService();
const tokenService = new TokenService();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const user = await userService.createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при регистрации" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  const isPasswordValid = await passwordService.comparePasswords(
    password,
    user.password,
  );
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  const tokens = tokenService.generateTokens({
    id: user._id,
    role: user.roles,
  });
  await tokenService.saveToken(user._id, tokens.refreshToken);

  res.json(tokens);
};

export const refreshTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const userData = tokenService.validateRefreshToken(refreshToken);
  if (!userData || typeof userData === "string") {
    return res.status(401).json({ message: "Неверный рефреш токен" });
  }

  const dbToken = await tokenService.findToken(refreshToken);
  if (!dbToken) {
    return res.status(401).json({ message: "Рефреш токен не найден" });
  }

  const tokens = tokenService.generateTokens({
    id: (userData as JwtPayload).id,
    role: (userData as JwtPayload).role,
  });
  await tokenService.saveToken(
    (userData as JwtPayload).id,
    tokens.refreshToken,
  );

  res.json(tokens);
};
