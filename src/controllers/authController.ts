import { Request, Response } from "express";

import { AuthService } from "../services/authService";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const tokens = await authService.refreshTokens(refreshToken);
    res.json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    await authService.logout(refreshToken);
    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAll = async (req: Request, res: Response) => {
  const userId = req.user.id; // Используем ID пользователя из токена
  try {
    await authService.logoutAll(userId);
    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
