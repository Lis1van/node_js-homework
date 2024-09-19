import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";

const tokenSchema = new Schema<IToken>({
  userId: { type: Schema.Types.Mixed, ref: "users", required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "30d" },
});

export const Token = model<IToken>("tokens", tokenSchema);
