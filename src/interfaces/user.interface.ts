// import { Role } from "../enums/role.enum";
//
// export interface IUser {
//   _id?: string;
//   id?: string;
//   name: string;
//   actionToken: string;
//   email: string;
//   password: string;
//   age: number;
//   isVerified: boolean;
//   isDeleted: boolean;
//   role: Role;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
import { Role } from "../enums/role.enum";

export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  isVerified: boolean;
  actionToken?: string; // Добавьте это поле
  actionTokenExpiresAt?: Date;
  isDeleted: boolean;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
