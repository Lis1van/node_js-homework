import mongoose, { Schema } from "mongoose";

const ActionTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  type: { type: String, required: true },
});

export const ActionToken = mongoose.model("ActionToken", ActionTokenSchema);
