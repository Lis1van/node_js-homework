// Импортируем необходимые типы из express: Request, Response и NextFunction.
// Request и Response нужны для обработки HTTP-запросов и ответов, NextFunction — для передачи управления следующему middleware или обработчику.
import { NextFunction, Request, Response } from "express";
// Импортируем методы body и validationResult из библиотеки express-validator.
// body используется для проверки данных в теле запроса (например, введенные пользователем имя, email, пароль).
// validationResult — для получения результатов валидации (проверки на корректность введенных данных).
import { body, validationResult } from "express-validator";

// Экспортируем функцию validateUser. Это массив middleware, который будет использоваться для проверки данных, поступающих от пользователя.
export const validateUser = [
  // Проверка поля "name" в теле запроса.
  // .isLength({ min: 3 }) — проверяет, что длина имени не менее 3 символов.
  // .withMessage("Имя должно содержать не менее 3 символов.") — если проверка не пройдена, вернется указанное сообщение.
  body("name")
    .isLength({ min: 3 })
    .withMessage("Имя должно содержать не менее 3 символов."),

  // Проверка поля "email" в теле запроса.
  // .isEmail() — проверяет, что введенный email соответствует правильному формату.
  // .withMessage("Неправильный формат email.") — сообщение, если проверка не прошла.
  body("email").isEmail().withMessage("Неправильный формат email."),

  // Проверка поля "password" в теле запроса.
  // .isLength({ min: 6 }) — проверяет, что длина пароля не менее 6 символов.
  // .matches(/\d/) — проверяет, что пароль содержит хотя бы одну цифру.
  // .withMessage — сообщение, которое вернется, если пароль не пройдет проверку.
  body("password")
    .isLength({ min: 6 })
    .matches(/\d/)
    .withMessage(
      "Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру.",
    ),

  // Следующий middleware-функционал для обработки результата валидации.
  // Функция получает три параметра: req (запрос), res (ответ), next (функция, чтобы передать выполнение дальше).
  (req: Request, res: Response, next: NextFunction) => {
    // validationResult проверяет, есть ли ошибки валидации.
    const errors = validationResult(req);

    // Если есть ошибки (errors.isEmpty() возвращает false), то:
    if (!errors.isEmpty()) {
      // Возвращаем ответ с кодом 400 (Bad Request) и списком ошибок.
      return res.status(400).json({ errors: errors.array() });
    }

    // Если ошибок нет, вызываем next() для передачи управления следующему middleware или обработчику.
    next();
  },
];
