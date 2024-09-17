import express from "express";
import mongoose from "mongoose";

import { config } from "./config/configs";
import userRoutes from "./routes/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.listen(config.PORT, async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
  } catch (error) {
    console.error("Ошибка подключения к MongoDB", error);
  }
});
