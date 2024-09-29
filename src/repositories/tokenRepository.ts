import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

export class TokenRepository {
  async saveToken(userId: string, refreshToken: string): Promise<IToken> {
    const existingToken = await Token.findOne({ userId });
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      return await existingToken.save();
    }

    const token = new Token({ userId, refreshToken });
    return await token.save();
  }

  async removeToken(refreshToken: string): Promise<void> {
    await Token.deleteOne({ refreshToken });
  }

  async deleteTokensByUserId(userId: string): Promise<void> {
    await Token.deleteMany({ userId });
  }

  async findToken(refreshToken: string): Promise<IToken | null> {
    return await Token.findOne({ refreshToken });
  }

  async findTokenByUserId(userId: string): Promise<IToken | null> {
    return await Token.findOne({ userId });
  }
  async saveActionToken(userId: string, actionToken: string): Promise<IToken> {
    const token = await Token.findOne({ userId });
    if (token) {
      token.actionToken = actionToken;
      return await token.save();
    }
    return await Token.create({ userId, actionToken });
  }

  async findActionToken(token: string): Promise<IToken | null> {
    return await Token.findOne({ actionToken: token });
  }

  async removeActionToken(userId: string): Promise<void> {
    await Token.updateOne({ userId }, { $unset: { actionToken: 1 } });
  }
}
