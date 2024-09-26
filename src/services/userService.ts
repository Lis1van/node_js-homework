import bcrypt from "bcrypt";
import { Types } from "mongoose";

import { Role } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
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
}
