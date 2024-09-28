import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { IUser } from "../interfaces/user.interface";
import { tokenService } from "../services/tokenService";

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
  if (
    typeof userData !== "object" ||
    !userData ||
    !(userData as JwtPayload).id
  ) {
    return res.status(401).json({ message: "Неверный или просроченный токен" });
  }

  console.log("Данные токена:", userData);
  req.user = {
    ...(userData as JwtPayload),
    _id: (userData as JwtPayload).id,
  } as IUser;
  next();
};
