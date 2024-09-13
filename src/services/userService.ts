// Импортируем класс UserRepository, который отвечает за чтение и запись данных пользователей в файл.
import { UserRepository } from "../repositories/userRepository";
// Импортируем интерфейс IUser, который описывает структуру объекта пользователя.
// Это позволяет использовать типы данных в TypeScript для более строгой проверки.
import { IUser } from "../types";

// Определяем класс UserService, который будет управлять логикой работы с пользователями.
// Он будет использовать UserRepository для взаимодействия с данными.
export class UserService {
  // Объявляем приватное поле userRepository, которое будет хранить экземпляр класса UserRepository.
  // Приватные поля недоступны за пределами этого класса.
  private userRepository: UserRepository;

  // Конструктор класса вызывается при создании нового экземпляра UserService.
  // В нем создается объект UserRepository для работы с данными.
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Метод getAllUsers() возвращает всех пользователей из файла.
  // Он использует метод readUsers() из UserRepository для чтения данных.
  getAllUsers(): IUser[] {
    return this.userRepository.readUsers();
  }

  // Метод createUser() создает нового пользователя с переданными данными (name, email, password).
  // Он считывает текущих пользователей, генерирует новый id для пользователя, добавляет его в массив и сохраняет обновленные данные.
  createUser(name: string, email: string, password: string): IUser {
    // Читаем текущих пользователей из файла.
    const users = this.userRepository.readUsers();

    // Генерируем уникальный id для нового пользователя. Если в списке уже есть пользователи,
    // то берем id последнего пользователя и прибавляем 1, иначе id будет равен 1.
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    // Создаем новый объект пользователя с переданными данными.
    const newUser: IUser = { id, name, email, password };

    // Добавляем нового пользователя в массив пользователей.
    users.push(newUser);

    // Записываем обновленный список пользователей в файл.
    this.userRepository.writeUsers(users);

    // Возвращаем созданного пользователя.
    return newUser;
  }

  // Метод updateUser() обновляет данные существующего пользователя по его userId.
  // Если пользователь с таким id не найден, метод возвращает null.
  updateUser(
    userId: number,
    name: string,
    email: string,
    password: string,
  ): IUser | null {
    // Читаем текущих пользователей из файла.
    const users = this.userRepository.readUsers();

    // Находим индекс пользователя с переданным id в массиве.
    const userIndex = users.findIndex((user: IUser) => user.id === userId);

    // Если пользователь не найден, возвращаем null.
    if (userIndex === -1) return null;

    // Обновляем данные пользователя (имя, email, пароль).
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].password = password;

    // Сохраняем обновленный список пользователей в файл.
    this.userRepository.writeUsers(users);

    // Возвращаем обновленного пользователя.
    return users[userIndex];
  }

  // Метод deleteUser() удаляет пользователя по его userId.
  // Если пользователь найден и удален, метод возвращает true, иначе false.
  deleteUser(userId: number): boolean {
    // Читаем текущих пользователей из файла.
    const users = this.userRepository.readUsers();

    // Находим индекс пользователя с переданным id в массиве.
    const userIndex = users.findIndex((user: IUser) => user.id === userId);

    // Если пользователь не найден, возвращаем false.
    if (userIndex === -1) return false;

    // Удаляем пользователя из массива.
    users.splice(userIndex, 1);

    // Сохраняем обновленный список пользователей в файл.
    this.userRepository.writeUsers(users);

    // Возвращаем true, указывая, что пользователь был успешно удален.
    return true;
  }
}
