import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Имя должно содержать не менее 3 символов.",
    "any.required": "Имя обязательно.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Неправильный формат email.",
    "any.required": "Email обязателен.",
  }),
  password: Joi.string().min(6).pattern(/\d/).required().messages({
    "string.min": "Пароль должен быть не менее 6 символов.",
    "string.pattern.base": "Пароль должен содержать хотя бы одну цифру.",
    "any.required": "Пароль обязателен.",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).pattern(/\d/).optional(),
})
  .or("name", "email", "password")
  .messages({
    "object.missing": "Необходимо указать хотя бы одно поле для обновления.",
  });

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ errors: error.details });
  }

  next();
};

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = updateUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ errors: error.details });
  }

  next();
};
