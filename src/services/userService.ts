import { IUser } from "../types";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    getAllUsers(): IUser[] {
        return this.userRepository.readUsers();
    }

    createUser(name: string, email: string, password: string): IUser {
        const users = this.userRepository.readUsers();
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser: IUser = { id, name, email, password };
        users.push(newUser);
        this.userRepository.writeUsers(users);
        return newUser;
    }

    updateUser(userId: number, name: string, email: string, password: string): IUser | null {
        const users = this.userRepository.readUsers();
        const userIndex = users.findIndex((user: IUser) => user.id === userId);
        if (userIndex === -1) return null;

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;
        this.userRepository.writeUsers(users);
        return users[userIndex];
    }

    deleteUser(userId: number): boolean {
        const users = this.userRepository.readUsers();
        const userIndex = users.findIndex((user: IUser) => user.id === userId);
        if (userIndex === -1) return false;

        users.splice(userIndex, 1);
        this.userRepository.writeUsers(users);
        return true;
    }
}
