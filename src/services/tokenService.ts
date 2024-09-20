import jwt from "jsonwebtoken";

import { config } from "../config/configs";
import { TokenRepository } from "../repositories/tokenRepository";

const tokenRepository = new TokenRepository();

export class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  // validateAccessToken(token: string) {
  //   try {
  //     return jwt.verify(token, config.JWT_ACCESS_SECRET);
  //   } catch {
  //     return null;
  //   }
  // }
  //
  // validateRefreshToken(token: string) {
  //   try {
  //     return jwt.verify(token, config.JWT_REFRESH_SECRET);
  //   } catch {
  //     return null;
  //   }
  // }
  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET);
    } catch (error) {
      console.error("Ошибка при валидации access токена:", error);
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET);
    } catch (error) {
      console.error("Ошибка при валидации refresh токена:", error);
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    return await tokenRepository.saveToken(userId, refreshToken);
  }

  async findToken(refreshToken: string) {
    return await tokenRepository.findToken(refreshToken);
  }
}
