import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3002,
  HOST: process.env.HOST,
  APP_URL: process.env.APP_URL,
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET,
};
