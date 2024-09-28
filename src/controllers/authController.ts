// import { Request, Response } from "express";
//
// import { AuthService } from "../services/authService";
//
// const authService = new AuthService();
//
// export const register = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//
//   try {
//     const user = await authService.register(name, email, password);
//     res.status(201).json(user);
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };
//
// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//
//   try {
//     const tokens = await authService.login(email, password);
//     res.json(tokens);
//   } catch (error: any) {
//     res.status(401).json({ message: error.message });
//   }
// };
//
// export const refreshTokens = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;
//
//   try {
//     const tokens = await authService.refreshTokens(refreshToken);
//     res.json(tokens);
//   } catch (error: any) {
//     res.status(401).json({ message: error.message });
//   }
// };
//
// export const logout = async (req: Request, res: Response) => {
//   try {
//     // Используем расшифрованный идентификатор пользователя из req.user
//     await authService.logout(req.user!._id as string); // req.user будет содержать объект с _id после мидлвара
//     res.status(200).json({ message: "Вы успешно вышли из системы" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// export const logoutAll = async (req: Request, res: Response) => {
//   try {
//     // Используем расшифрованный идентификатор пользователя из req.user
//     await authService.logoutAll(req.user!._id as string); // req.user будет содержать объект с _id после мидлвара
//     res.status(200).json({ message: "Вы успешно вышли из системы" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// import { Request, Response } from "express";
//
// import { EmailAction } from "../enums/email.enum";
// import { AuthService } from "../services/authService";
// import { emailService } from "../services/emailService";
// import { tokenService } from "../services/tokenService";
// import { userService } from "../services/userService";
//
// const authService = new AuthService();
//
// export const register = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//
//   try {
//     const user = await authService.register(name, email, password);
//     res.status(201).json(user);
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };
//
// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//
//   try {
//     const tokens = await authService.login(email, password);
//     res.json(tokens);
//   } catch (error: any) {
//     res.status(401).json({ message: error.message });
//   }
// };
//
// export const refreshTokens = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;
//
//   try {
//     const tokens = await authService.refreshTokens(refreshToken);
//     res.json(tokens);
//   } catch (error: any) {
//     res.status(401).json({ message: error.message });
//   }
// };
//
// export const logout = async (req: Request, res: Response) => {
//   try {
//     // Используем расшифрованный идентификатор пользователя из req.user
//     await authService.logout(req.user!._id as string); // req.user будет содержать объект с _id после мидлвара
//     res.status(200).json({ message: "Вы успешно вышли из системы" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// export const logoutAll = async (req: Request, res: Response) => {
//   try {
//     // Используем расшифрованный идентификатор пользователя из req.user
//     await authService.logoutAll(req.user!._id as string); // req.user будет содержать объект с _id после мидлвара
//     res.status(200).json({ message: "Вы успешно вышли из системы" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// // Запрос на восстановление пароля
// export const forgotPassword = async (req: Request, res: Response) => {
//   const { email } = req.body;
//
//   try {
//     const user = await userService.getUserByEmail(email);
//     if (!user) throw new Error("User not found");
//
//     const actionToken = tokenService.generateActionToken(user._id);
//     user.actionToken = actionToken;
//     user.actionTokenExpiresAt = new Date(Date.now() + 3600 * 1000); // 1 час
//     await user.save();
//
//     await emailService.sendMail(email, EmailAction.FORGOT_PASSWORD, {
//       name: user.name,
//       actionToken,
//     });
//
//     res.status(200).json({ message: "Password reset link sent" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// // Сброс пароля
// export const resetPassword = async (req: Request, res: Response) => {
//   const { token, newPassword } = req.body;
//
//   try {
//     const tokenData = tokenService.validateActionToken(token);
//     if (typeof tokenData === "string") throw new Error("Invalid token");
//
//     const user = await userService.getUserById(tokenData.userId);
//     if (!user || user.actionTokenExpiresAt < new Date()) {
//       throw new Error("Invalid or expired token");
//     }
//
//     user.password = await userService.hashPassword(newPassword);
//     user.actionToken = undefined;
//     user.actionTokenExpiresAt = undefined;
//     await user.save();
//
//     res.status(200).json({ message: "Password successfully reset" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// // Верификация email
// export const verifyEmail = async (req: Request, res: Response) => {
//   const { token } = req.params;
//
//   try {
//     const tokenData = tokenService.validateActionToken(token);
//     if (typeof tokenData === "string") throw new Error("Invalid token");
//
//     const user = await userService.getUserById(tokenData.userId);
//     if (!user || user.actionTokenExpiresAt < new Date()) {
//       throw new Error("Invalid or expired token");
//     }
//
//     user.isVerified = true;
//     user.actionToken = undefined;
//     user.actionTokenExpiresAt = undefined;
//     await user.save();
//
//     res.status(200).json({ message: "Email successfully verified" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import { Request, Response } from "express";

import { EmailAction } from "../enums/email.enum";
import { UserRepository } from "../repositories/userRepository";
import { AuthService } from "../services/authService";
import { emailService } from "../services/emailService";
import { passwordService } from "../services/passwordService";
import { tokenService } from "../services/tokenService";

const authService = new AuthService();
const userRepository = new UserRepository();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const tokens = await authService.refreshTokens(refreshToken);
    res.json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await authService.logout(req.user!._id as string);
    res.status(200).json({ message: "Вы успешно вышли из системы" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAll = async (req: Request, res: Response) => {
  try {
    await authService.logoutAll(req.user!._id as string);
    res.status(200).json({ message: "Вы успешно вышли из системы" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const actionToken = tokenService.generateActionToken({ id: user._id });
    const updateData = {
      actionToken,
      actionTokenExpiresAt: new Date(Date.now() + 3600 * 1000), // 1 час
    };

    await userRepository.updateUser(user._id, updateData);

    await emailService.sendMail(
      email,
      EmailAction.FORGOT_PASSWORD,
      `Name: ${user.name}, ActionToken: ${actionToken}`,
      actionToken,
    );

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const tokenData = tokenService.validateActionToken(token);
    if (typeof tokenData === "string") throw new Error("Invalid token");

    const user = await userRepository.findById(tokenData.userId);
    if (!user || user.actionTokenExpiresAt! < new Date()) {
      throw new Error("Invalid or expired token");
    }

    const hashedPassword = await passwordService.hashPassword(newPassword);
    const updateData = {
      password: hashedPassword,
      actionToken: undefined,
      actionTokenExpiresAt: undefined,
    };

    await userRepository.updateUser(user._id, updateData);

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const tokenData = tokenService.validateActionToken(token);
    if (typeof tokenData === "string") throw new Error("Invalid token");

    const user = await userRepository.findById(tokenData.userId);
    if (!user || user.actionTokenExpiresAt! < new Date()) {
      throw new Error("Invalid or expired token");
    }

    const updateData = {
      isVerified: true,
      actionToken: undefined,
      actionTokenExpiresAt: undefined,
    };

    await userRepository.updateUser(user._id, updateData);

    res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
