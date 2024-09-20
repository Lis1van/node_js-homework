import * as path from "node:path";

import fs from "fs";

import { IUser } from "../interfaces/user.interface";

const usersFilePath = path.join(process.cwd(), "users.json");

export function readUsers(): IUser[] {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function writeUsers(users: IUser[]): void {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
