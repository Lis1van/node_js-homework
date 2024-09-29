import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

import { EmailAction } from "../enums/email.enum";
import { IUser } from "../interfaces/user.interface";
import { TokenRepository } from "../repositories/tokenRepository";
import { emailService } from "./emailService";
import { PasswordService } from "./passwordService";
import { TokenService } from "./tokenService";
import { UserService } from "./userService";

const userService = new UserService();
const passwordService = new PasswordService();
const tokenService = new TokenService();
const tokenRepository = new TokenRepository();

export class AuthService {
  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Пользователь уже существует");
    }

    const user = await userService.createUser(name, email, password);
    await emailService.sendMail(email, EmailAction.WELCOME, name);
    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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

  async logout(userId: string): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    await tokenService.deleteAllTokens(userId);
    await emailService.sendMail(user.email, EmailAction.LOGOUT, user.name);
  }

  async logoutAll(userId: string): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    await tokenService.deleteAllTokens(userId);
    await emailService.sendMail(user.email, EmailAction.LOGOUT_ALL, user.name);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Проверка на количество попыток сброса пароля
    const resetAttempts = await tokenRepository.getResetAttempts(user._id);
    if (resetAttempts >= 3) {
      throw new Error(
        "Too many password reset attempts. Please try again later.",
      );
    }

    const token = tokenService.generateActionToken(user._id, "reset-password");
    await tokenRepository.saveActionToken(user._id, token);
    await tokenRepository.incrementResetAttempts(user._id);

    await emailService.sendMail(
      user.email,
      EmailAction.FORGOT_PASSWORD,
      user.name,
      token,
    );
  }

  async verifyEmail(token: string): Promise<void> {
    const payload = tokenService.validateActionToken(token);
    if (!payload) {
      throw new Error("Invalid token");
    }

    const user = await userService.getUserById(payload);
    if (!user) {
      throw new Error("Invalid token or user not found");
    }

    await userService.updateUser(user._id.toString(), { isVerified: true }); // Передаем userId и объект с изменениями
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const payload = tokenService.validateActionToken(token);
    if (!payload) {
      throw new Error("Invalid token");
    }

    const user = await userService.getUserById(payload);
    if (!user) {
      throw new Error("Invalid token or user not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userService.updatePassword(user._id.toString(), hashedPassword); // Передаем userId и новый хэшированный пароль
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await passwordService.comparePasswords(
      currentPassword,
      user.password,
    );
    if (!isMatch) throw new Error("Current password is incorrect");

    const hashedPassword = await passwordService.hashPassword(newPassword);
    await userService.updatePassword(userId, hashedPassword);
  }
}
