import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { ActionTokenType } from "../enums/actionToken.enum";
import { Role } from "../enums/role.enum";
import { IActionToken } from "../interfaces/actionToken.interface";
import { IUser } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/actionTokenRepository";
import { UserRepository } from "../repositories/userRepository";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getUserById(userId: string): Promise<IUser | null> {
    try {
      const objectId = new Types.ObjectId(userId); // Преобразуем строковый ID в ObjectId
      return await this.userRepository.findById(objectId.toString()); // Приводим ObjectId к строке
    } catch (err) {
      console.error("Ошибка при поиске пользователя по ID:", err);
      throw new Error("Некорректный формат идентификатора пользователя");
    }
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: IUser = {
      name,
      email,
      age: 0,
      password: hashedPassword,
      isVerified: false,
      isDeleted: false,
      role: Role.USER,
    };

    return await this.userRepository.createUser(userData);
  }

  async updateUser(
    userId: string,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<IUser | null> {
    const updateData: Partial<IUser> = { name, email, password };
    return await this.userRepository.updateUser(userId, updateData);
  }

  async deleteUser(userId: string): Promise<boolean> {
    return await this.userRepository.deleteUser(userId);
  }

  private generateToken(userId: string): string {
    const secretKey = process.env.JWT_SECRET || "your_jwt_secret";
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  }

  async sendPasswordResetToken(userId: string) {
    const token = this.generateToken(userId);

    const objectId = new Types.ObjectId(userId);

    const actionToken: IActionToken = {
      token,
      userId: objectId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
      type: ActionTokenType.PASSWORD_RESET,
    };

    await actionTokenRepository.createToken(actionToken);
    // Отправить email или SMS с токеном
  }

  async resetPassword(token: string, newPassword: string) {
    let decodedToken;
    const secretKey = process.env.JWT_SECRET || "your_jwt_secret";

    try {
      decodedToken = jwt.verify(token, secretKey) as { userId: string };
    } catch (error) {
      console.log(error);
      throw new Error("Token is invalid or expired");
    }

    const tokenData = await actionTokenRepository.findToken(
      token,
      ActionTokenType.PASSWORD_RESET,
    );

    if (!tokenData) {
      throw new Error("Token not found in database");
    }

    // Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль пользователя
    await this.userRepository.updateUser(decodedToken.userId, {
      password: hashedPassword,
    });

    // Удаляем использованный токен
    await actionTokenRepository.deleteToken(token);
  }
}

export const userService = new UserService();
