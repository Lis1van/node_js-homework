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
}
