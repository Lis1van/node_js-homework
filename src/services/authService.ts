import { JwtPayload } from "jsonwebtoken";

import { EmailAction } from "../enums/email.enum";
import { emailService } from "./emailService";
import { PasswordService } from "./passwordService";
import { TokenService } from "./tokenService";
import { UserService } from "./userService";

const userService = new UserService();
const passwordService = new PasswordService();
const tokenService = new TokenService();

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Пользователь уже существует");
    }

    const user = await userService.createUser(name, email, password);
    await emailService.sendMail(email, EmailAction.WELCOME, name);
    return user;
  }

  async login(email: string, password: string) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new Error("Неверный логин или пароль");
    }

    const isPasswordValid = await passwordService.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error("Неверный логин или пароль");
    }

    const tokens = tokenService.generateTokens({
      id: user._id,
      role: user.role,
    });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(refreshToken: string) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData || typeof userData === "string") {
      throw new Error("Неверный рефреш токен");
    }

    const dbToken = await tokenService.findToken(refreshToken);
    if (!dbToken) {
      throw new Error("Рефреш токен не найден");
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
  async logout(refreshToken: string) {
    const tokenData = await tokenService.findToken(refreshToken);
    if (!tokenData) {
      throw new Error("Токен не найден");
    }

    const user = await userService.getUserById(tokenData.userId.toString());
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    await tokenService.deleteToken(refreshToken);
    await emailService.sendMail(user.email, EmailAction.LOGOUT, user.name);
  }

  async logoutAll(userId: string) {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    await tokenService.deleteAllTokens(userId);
    await emailService.sendMail(user.email, EmailAction.LOGOUT_ALL, user.name);
  }
}
