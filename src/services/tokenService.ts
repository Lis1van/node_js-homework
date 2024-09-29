import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "../config/configs";
import { IToken } from "../interfaces/token.interface";
import { TokenRepository } from "../repositories/tokenRepository";

const tokenRepository = new TokenRepository();

export class TokenService {
  generateTokens(payload: any): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;
    } catch (error) {
      console.error("Ошибка при валидации access токена:", error);
      return null;
    }
  }

  validateRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload;
    } catch (error) {
      console.error("Ошибка при валидации refresh токена:", error);
      return null;
    }
  }

  generateActionToken(userId: string, action: string): string {
    return jwt.sign({ id: userId, action }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
  }

  validateActionToken(token: string): string | null {
    try {
      const payload = jwt.verify(token, config.JWT_ACCESS_SECRET);
      return (payload as jwt.JwtPayload).id;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string): Promise<void> {
    const existingToken = await tokenRepository.findTokenByUserId(userId);
    if (existingToken) {
      await tokenRepository.removeToken(existingToken.refreshToken);
    }
    await tokenRepository.saveToken(userId, refreshToken);
  }

  async findToken(refreshToken: string): Promise<IToken | null> {
    return await tokenRepository.findToken(refreshToken);
  }

  async deleteToken(refreshToken: string): Promise<void> {
    await tokenRepository.removeToken(refreshToken);
  }

  async deleteAllTokens(userId: string): Promise<void> {
    await tokenRepository.deleteTokensByUserId(userId);
  }
}
