import { IActionToken } from "../interfaces/actionToken.interface";
import { ActionToken } from "../models/actionToken.model";

export const actionTokenRepository = {
  async createToken(actionToken: IActionToken) {
    return await ActionToken.create(actionToken);
  },

  async findToken(token: string, type: string) {
    return await ActionToken.findOne({ token, type });
  },

  async deleteToken(token: string) {
    return await ActionToken.findOneAndDelete({ token });
  },
};
