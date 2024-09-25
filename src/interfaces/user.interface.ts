import { Role } from "../enums/role.enum";

export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  isVerified: boolean;
  isDeleted: boolean;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
