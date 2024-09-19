import { UserRepository } from "../repositories/userRepository";
import { IUser } from "../types";

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

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const userData: IUser = {
      name,
      email,
      password,
      age: 0,
      isVerified: false,
      isDeleted: false,
      roles: "user",
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
