import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3002,
  HOST: process.env.HOST,
  MONGO_URI: process.env.MONGODB_URI,
};
