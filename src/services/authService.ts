import { JwtPayload } from "jsonwebtoken";

import { EmailAction } from "../enums/email.enum";
import { IUser } from "../interfaces/user.interface";
import { ApiError } from "../utils/apiError";
import { emailService } from "./emailService";
import { passwordService } from "./passwordService";
import { tokenService } from "./tokenService";
import { userService } from "./userService";

export class AuthService {
  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw new ApiError("Пользователь уже существует", 400);
    }

    const hashedPassword = await passwordService.hashPassword(password);
    const user = await userService.createUser(name, email, hashedPassword);

    // Генерация токена для верификации email
    const verificationToken = tokenService.generateEmailVerificationToken(
      user._id,
    );

    // Отправка email с токеном
    await emailService.sendMail(
      email,
      EmailAction.WELCOME,
      name,
      verificationToken,
    );

    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await userService.getUserByEmail(email);
    console.log("User found:", user);
    if (!user) {
      throw new ApiError("Неверный логин или пароль", 400);
    }

    const isPasswordValid = await passwordService.comparePasswords(
      password,
      user.password,
    );
    console.log("Is password valid:", isPasswordValid);
    if (!isPasswordValid) {
      throw new ApiError("Неверный логин или пароль", 400);
    }

    const tokens = tokenService.generateTokens({
      id: user._id,
      role: user.role,
    });
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData || typeof userData === "string") {
      throw new ApiError("Неверный рефреш токен", 401);
    }

    const dbToken = await tokenService.findToken(refreshToken);
    if (!dbToken) {
      throw new ApiError("Рефреш токен не найден", 404);
    }

    const tokens = tokenService.generateTokens({
      id: (userData as JwtPayload).id,
      role: (userData as JwtPayload).role,
    });

    await tokenService.saveToken(
      (userData as JwtPayload).id,
      tokens.refreshToken,
    );

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError("Пользователь не найден", 404);
    }

    await tokenService.deleteAllTokens(userId);
    await emailService.sendMail(user.email, EmailAction.LOGOUT, user.name, "");
  }

  async logoutAll(userId: string): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError("Пользователь не найден", 404);
    }

    await tokenService.deleteAllTokens(userId);
    await emailService.sendMail(
      user.email,
      EmailAction.LOGOUT_ALL,
      user.name,
      "",
    );
  }
}
