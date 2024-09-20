import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { TokenService } from "../services/tokenService";

const tokenService = new TokenService();

export const refreshMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Рефреш токен отсутствует" });
  }

  const userData = tokenService.validateRefreshToken(refreshToken);
  if (!userData) {
    return res.status(401).json({ message: "Неверный рефреш токен" });
  }

  const dbToken = await tokenService.findToken(refreshToken);
  if (!dbToken) {
    return res.status(401).json({ message: "Рефреш токен не найден" });
  }

  req.user = userData as IUser;
  next();
};
