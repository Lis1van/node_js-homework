import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "../config/configs";
import { TokenRepository } from "../repositories/tokenRepository";

class TokenService {
  private tokenRepository = new TokenRepository();

  // Метод для генерации access и refresh токенов
  generateTokens(payload: { id: string; role: string }) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  // Метод для проверки валидности refresh токена
  validateRefreshToken(token: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // Новый метод для генерации action токена
  generateActionToken(payload: { id: string }, expiresIn = "1h"): string {
    return jwt.sign(payload, config.ACTION_TOKEN_SECRET, { expiresIn });
  }

  // Новый метод для проверки валидности action токена
  validateActionToken(token: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, config.ACTION_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // Метод для проверки валидности access токена
  validateAccessToken(token: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    return await this.tokenRepository.saveToken(userId, refreshToken);
  }

  async deleteAllTokens(userId: string) {
    return await this.tokenRepository.deleteTokensByUserId(userId);
  }

  async findToken(refreshToken: string) {
    return await this.tokenRepository.findToken(refreshToken);
  }
}

export const tokenService = new TokenService();
