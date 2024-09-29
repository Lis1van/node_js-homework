import { Types } from "mongoose";

export interface IToken {
  userId: Types.ObjectId;
  refreshToken: string;
  actionToken?: string;
  createdAt?: Date;
  resetAttempts: number;
}
