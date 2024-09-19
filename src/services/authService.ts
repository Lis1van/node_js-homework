import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { config } from "../config/configs";
import { UserRepository } from "../repositories/userRepository";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Неверный пароль");
    }

    // Генерируем JWT токен
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.JWT_ACCESS_SECRET,
      { expiresIn: "1h" },
    );
    return token;
  }
}
