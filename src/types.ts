export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  isVerified: boolean;
  isDeleted: boolean;
  roles: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
