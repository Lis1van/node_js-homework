import { model, Schema } from "mongoose";

import { Role } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userScheme = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Role, default: Role.USER },
    age: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const User = model<IUser>("users", userScheme);
