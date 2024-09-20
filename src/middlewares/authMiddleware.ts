import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { TokenService } from "../services/tokenService";

const tokenService = new TokenService();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Необходима авторизация" });
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Токен отсутствует" });
  }

  const userData = tokenService.validateAccessToken(token);
  if (!userData) {
    return res.status(401).json({ message: "Неверный или просроченный токен" });
  }

  req.user = userData as IUser;
  next();
};
