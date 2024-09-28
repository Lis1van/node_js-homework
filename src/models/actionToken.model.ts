import { model, Schema } from "mongoose";

import { IActionToken } from "../interfaces/actionToken.interface";

const actionTokenSchema = new Schema<IActionToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const ActionToken = model<IActionToken>(
  "ActionToken",
  actionTokenSchema,
);
