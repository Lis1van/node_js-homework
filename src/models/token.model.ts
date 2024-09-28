// import { model, Schema } from "mongoose";
//
// import { IToken } from "../interfaces/token.interface";
//
// const tokenSchema = new Schema<IToken>({
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   refreshToken: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now, expires: "30d" },
// });
//
// export const Token = model<IToken>("Token", tokenSchema);

import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";

const tokenSchema = new Schema<IToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "30d" },
});

export const Token = model<IToken>("Token", tokenSchema);
