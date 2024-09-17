import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateUser = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Имя должно содержать не менее 3 символов."),

  body("email").isEmail().withMessage("Неправильный формат email."),

  body("password")
    .isLength({ min: 6 })
    .matches(/\d/)
    .withMessage(
      "Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру.",
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Возвращаем ответ с кодом 400 (Bad Request) и списком ошибок.
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
