import express from "express";
import mongoose from "mongoose";

import { config } from "./config/configs";
import authRoutes from "./routes/authRouter";
import userRoutes from "./routes/usersRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(config.PORT, async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
  } catch (error) {
    console.error("Ошибка подключения к MongoDB", error);
  }
});
