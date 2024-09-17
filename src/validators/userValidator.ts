import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Имя обязательно для заполнения.",
    "string.min": "Имя должно содержать не менее 3 символов.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email обязателен для заполнения.",
    "string.email": "Неправильный формат email.",
  }),
  password: Joi.string().min(6).pattern(/\d/).required().messages({
    "string.empty": "Пароль обязателен для заполнения.",
    "string.min": "Пароль должен быть не менее 6 символов.",
    "string.pattern.base": "Пароль должен содержать хотя бы одну цифру.",
  }),
  age: Joi.number().integer().min(0).optional().messages({
    "number.base": "Возраст должен быть числом.",
    "number.min": "Возраст не может быть отрицательным.",
  }),
});
