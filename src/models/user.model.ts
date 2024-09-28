import { model, Schema } from "mongoose";

import { Role } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Role, default: Role.USER },
    age: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    actionToken: { type: String }, // Токен для подтверждения email или восстановления пароля
    actionTokenExpiresAt: { type: Date }, // Дата истечения токена
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
