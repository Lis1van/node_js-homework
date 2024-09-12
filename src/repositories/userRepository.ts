import { IUser } from "../types";
import * as fs from "fs";
import * as path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");

export class UserRepository {
    readUsers(): IUser[] {
        try {
            const data = fs.readFileSync(usersFilePath, "utf8");
            return JSON.parse(data);
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    writeUsers(users: IUser[]): void {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    }
}
