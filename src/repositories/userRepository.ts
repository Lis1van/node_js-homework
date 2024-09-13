// Импортируем модуль 'fs' (file system) из Node.js для работы с файловой системой.
// Он позволяет нам читать и записывать файлы на диске.
import * as fs from "fs";
// Импортируем модуль 'path' из Node.js для работы с путями к файлам и директориям.
// Мы используем его для построения абсолютного пути к файлу users.json.
import * as path from "path";

// Импортируем интерфейс IUser, который описывает структуру объекта пользователя.
// Это помогает TypeScript понимать, что именно хранится в списке пользователей.
import { IUser } from "../types";

// Определяем переменную 'usersFilePath', которая хранит абсолютный путь к файлу users.json.
// 'process.cwd()' возвращает текущую рабочую директорию (директория, в которой запущено приложение),
// а 'path.join' объединяет этот путь с файлом "users.json".
const usersFilePath = path.join(process.cwd(), "users.json");

// Создаем класс UserRepository, который будет отвечать за взаимодействие с данными пользователей.
// Это шаблон проектирования, который помогает изолировать логику работы с данными от остального кода.
export class UserRepository {
  // Метод readUsers() считывает всех пользователей из файла users.json и возвращает их в виде массива IUser.
  // Если происходит ошибка (например, файл не найден), метод возвращает пустой массив.
  readUsers(): IUser[] {
    try {
      // Читаем содержимое файла users.json в виде строки.
      // 'utf8' указывает, что содержимое файла должно быть прочитано как текст в кодировке UTF-8.
      const data = fs.readFileSync(usersFilePath, "utf8");

      // Преобразуем строку в JavaScript-объекты (массив пользователей) с помощью JSON.parse и возвращаем его.
      return JSON.parse(data);
    } catch (err) {
      // Если происходит ошибка (например, файл отсутствует или произошла ошибка чтения),
      // выводим сообщение об ошибке в консоль и возвращаем пустой массив, чтобы программа не прерывалась.
      console.error(err);
      return [];
    }
  }

  // Метод writeUsers() принимает массив пользователей (IUser[]) и записывает их в файл users.json.
  writeUsers(users: IUser[]): void {
    // Преобразуем массив пользователей в строку формата JSON с отступами для лучшей читаемости.
    // 'null' — это параметр функции замены (в данном случае мы его не используем),
    // а '2' — это количество пробелов для отступов в JSON-структуре.
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  }
}
