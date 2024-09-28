import { Types } from "mongoose";

export interface IActionToken {
  userId: Types.ObjectId;
  token: string;
  type: string; // Изменено с 'tokenType' на 'type'
  createdAt: Date; // Добавлено поле createdAt
  expiresAt: Date;
}
