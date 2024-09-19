import { User } from "../models/user.model";
import { IUser } from "../types";

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
  async findAll(): Promise<IUser[]> {
    try {
      return await User.find({ isDeleted: false });
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при получении пользователей");
    }
  }

  async findById(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId);
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при поиске пользователя");
    }
  }

  async createUser(userData: IUser): Promise<IUser> {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при создании пользователя");
    }
  }

  async updateUser(
    userId: string,
    updateData: Partial<IUser>,
  ): Promise<IUser | null> {
    try {
      return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при обновлении пользователя");
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return false;
      }

      user.isDeleted = true;
      await user.save();
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при удалении пользователя");
    }
  }
}
