// import * as path from "node:path";
//
// import express, { Request, Response } from "express";
// import fs from "fs";
//
// interface IUser {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// }
//
// const index = express();
//
// index.use(express.json());
// index.use(express.urlencoded({ extended: true }));
//
// const usersFilePath = path.join(process.cwd(), "users.json");
//
// function validateEmail(email: string) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }
//
// function validateName(name: string) {
//   return name.length >= 3;
// }
//
// function validatePassword(password: string) {
//   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
//   return passwordRegex.test(password);
// }
//
// function readUsers() {
//   try {
//     const data = fs.readFileSync(usersFilePath, "utf8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// }
//
// function writeUsers(users: IUser) {
//   fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
// }
//
// index.get("/users", (res: Response) => {
//   try {
//     const users = readUsers();
//     res.send(users);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });
//
// index.post("/users", (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;
//
//     if (!validateName(name)) {
//       return res.status(400).send("Имя должно содержать не менее 3 символов.");
//     }
//
//     if (!validateEmail(email)) {
//       return res.status(400).send("Неправильный формат email.");
//     }
//
//     if (!validatePassword(password)) {
//       return res
//         .status(400)
//         .send(
//           "Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру и одну букву.",
//         );
//     }
//
//     const users = readUsers();
//     const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
//     const newUser = { id, name, email, password };
//
//     users.push(newUser);
//     writeUsers(users);
//
//     res.status(201).send(newUser);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });
//
// index.put("/users/:userId", (req: Request, res: Response) => {
//   try {
//     const userId = Number(req.params.userId);
//     const { name, email, password } = req.body;
//
//     if (!validateName(name)) {
//       return res.status(400).send("Имя должно содержать не менее 3 символов.");
//     }
//
//     if (!validateEmail(email)) {
//       return res.status(400).send("Неправильный формат email.");
//     }
//
//     if (!validatePassword(password)) {
//       return res
//         .status(400)
//         .send(
//           "Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру и одну букву.",
//         );
//     }
//
//     const users = readUsers();
//     const userIndex = users.findIndex((user: IUser) => user.id === userId);
//
//     if (userIndex === -1) {
//       return res.status(404).send("Пользователь не найден.");
//     }
//
//     users[userIndex].name = name;
//     users[userIndex].email = email;
//     users[userIndex].password = password;
//
//     writeUsers(users);
//     res.status(201).send(users[userIndex]);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });
//
// index.delete("/users/:userId", (req: Request, res: Response) => {
//   try {
//     const userId = Number(req.params.userId);
//     const users = readUsers();
//
//     const userIndex = users.findIndex((user: IUser) => user.id === userId);
//
//     if (userIndex === -1) {
//       return res.status(404).send("Пользователь не найден.");
//     }
//
//     users.splice(userIndex, 1);
//     writeUsers(users);
//
//     res.sendStatus(204);
//   } catch (e: any) {
//     res.status(500).send(e.message);
//   }
// });
//
// index.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

import express from "express";

import userRoutes from "./routes/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
