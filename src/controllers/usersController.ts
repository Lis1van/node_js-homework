// Импортируем типы Request и Response из express.
// Эти типы используются для указания типов данных, с которыми работают функции (запрос и ответ).
import { Request, Response } from "express";

// Импортируем сервис пользователя из файла "../services/userService".
// UserService - это класс, который содержит логику для работы с данными пользователей (например, из базы данных или другого хранилища).
import { UserService } from "../services/userService";

// Создаем экземпляр класса UserService.
// Это объект, через который будем вызывать методы для работы с пользователями (например, создание, обновление, удаление).
const userService = new UserService();

// Функция для обработки GET-запроса и получения всех пользователей.
// Когда сервер получает запрос на получение пользователей, эта функция извлекает всех пользователей с помощью userService и возвращает их в формате JSON.
export const getUsers = (req: Request, res: Response) => {
  try {
    // Получаем всех пользователей через метод getAllUsers из сервиса.
    const users = userService.getAllUsers();

    // Если всё прошло успешно, возвращаем массив пользователей с кодом 200 (OK).
    res.status(200).json(users);
  } catch (error: any) {
    // В случае ошибки возвращаем статус 500 (Internal Server Error) и сообщение об ошибке.
    res.status(500).json({ message: error.message });
  }
};

// Функция для обработки POST-запроса и создания нового пользователя.
// Когда клиент отправляет запрос на создание пользователя, функция извлекает данные из тела запроса, создает нового пользователя через userService и возвращает созданного пользователя в ответе.
export const createUser = (req: Request, res: Response) => {
  try {
    // Получаем данные из тела запроса (name, email, password), которые были отправлены клиентом.
    const { name, email, password } = req.body;

    // Создаем нового пользователя через метод createUser из сервиса.
    const newUser = userService.createUser(name, email, password);

    // Возвращаем созданного пользователя с кодом 201 (Created).
    res.status(201).json(newUser);
  } catch (error: any) {
    // В случае ошибки возвращаем статус 500 и сообщение об ошибке.
    res.status(500).json({ message: error.message });
  }
};

// Функция для обработки PUT-запроса и обновления информации о пользователе.
// При получении запроса на обновление, функция извлекает ID пользователя и данные из тела запроса, затем обновляет информацию о пользователе через userService.
export const updateUser = (req: Request, res: Response) => {
  try {
    // Преобразуем ID пользователя, переданный как параметр, в число.
    const userId = Number(req.params.userId);

    // Получаем новые данные для обновления из тела запроса (name, email, password).
    const { name, email, password } = req.body;

    // Обновляем информацию о пользователе через метод updateUser из сервиса.
    const updatedUser = userService.updateUser(userId, name, email, password);

    // Если пользователь с таким ID не найден, возвращаем статус 404 (Not Found) и сообщение.
    if (!updatedUser) {
      return res.status(404).send("Пользователь не найден.");
    }

    // Если обновление прошло успешно, возвращаем обновленного пользователя с кодом 200 (OK).
    res.status(200).json(updatedUser);
  } catch (error: any) {
    // В случае ошибки возвращаем статус 500 и сообщение об ошибке.
    res.status(500).json({ message: error.message });
  }
};

// Функция для обработки DELETE-запроса и удаления пользователя.
// Когда клиент отправляет запрос на удаление пользователя, функция извлекает ID пользователя и удаляет его через userService.
export const deleteUser = (req: Request, res: Response) => {
  try {
    // Преобразуем ID пользователя из параметров запроса в число.
    const userId = Number(req.params.userId);

    // Удаляем пользователя через метод deleteUser из сервиса.
    const isDeleted = userService.deleteUser(userId);

    // Если пользователь с таким ID не найден, возвращаем статус 404 (Not Found) и сообщение.
    if (!isDeleted) {
      return res.status(404).send("Пользователь не найден.");
    }

    // Если удаление прошло успешно, возвращаем статус 204 (No Content), что означает успешное выполнение, но без содержимого.
    res.sendStatus(204);
  } catch (error: any) {
    // В случае ошибки возвращаем статус 500 и сообщение об ошибке.
    res.status(500).json({ message: error.message });
  }
};
