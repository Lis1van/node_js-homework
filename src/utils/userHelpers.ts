// Импортируем модуль 'path' из Node.js, который позволяет работать с путями к файлам и директориям.
// Мы используем его для построения абсолютного пути к файлу users.json.
import * as path from "node:path";

// Импортируем модуль 'fs' (file system) из Node.js для работы с файловой системой.
// Этот модуль позволяет читать и записывать файлы.
import fs from "fs";

// Импортируем интерфейс IUser, который определяет структуру объекта пользователя.
// Он используется для типизации данных пользователей.
import { IUser } from "../types";

// Создаем переменную 'usersFilePath', которая хранит абсолютный путь к файлу users.json.
// 'process.cwd()' возвращает текущую рабочую директорию (где запущен проект), а 'path.join' соединяет путь с файлом "users.json".
const usersFilePath = path.join(process.cwd(), "users.json");

// Функция readUsers() считывает и возвращает всех пользователей из файла users.json.
// Тип возвращаемого значения — массив объектов IUser.
export function readUsers(): IUser[] {
  try {
    // Считываем содержимое файла users.json в виде строки.
    // 'utf8' указывает, что мы хотим читать файл как текст в кодировке UTF-8.
    const data = fs.readFileSync(usersFilePath, "utf8");

    // Преобразуем строку JSON в массив объектов пользователей и возвращаем его.
    return JSON.parse(data);
  } catch (err) {
    // Если происходит ошибка (например, файл не найден или произошла ошибка чтения),
    // выводим ошибку в консоль и возвращаем пустой массив.
    console.error(err);
    return [];
  }
}

// Функция writeUsers() записывает массив пользователей в файл users.json.
// Она ничего не возвращает (тип void).
export function writeUsers(users: IUser[]): void {
  // Преобразуем массив пользователей в строку JSON с отступами для лучшей читаемости.
  // 'null' — это значение для функции замены (в данном случае мы ее не используем),
  // а '2' — количество пробелов, которые будут добавлены для отступов в структуре JSON.
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
