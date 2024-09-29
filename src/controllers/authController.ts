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
  try {
    await authService.logout(req.user!._id as string);
    res.status(200).json({ message: "Вы успешно вышли из системы" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAll = async (req: Request, res: Response) => {
  try {
    await authService.logoutAll(req.user!._id as string);
    res.status(200).json({ message: "Вы успешно вышли из системы" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await authService.forgotPassword(email);
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  try {
    await authService.changePassword(
      req.user!._id,
      currentPassword,
      newPassword,
    );
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    await authService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    await authService.verifyEmail(token);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
