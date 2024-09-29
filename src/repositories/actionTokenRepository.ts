import { ActionToken } from "../models/actionToken.model";

export class ActionTokenRepository {
  async create(tokenData: any) {
    return await ActionToken.create(tokenData);
  }

  async findByToken(token: string) {
    return await ActionToken.findOne({ token });
  }

  async delete(token: string) {
    return await ActionToken.deleteOne({ token });
  }
}
