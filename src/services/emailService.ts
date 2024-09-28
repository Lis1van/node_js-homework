import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import hbs from "nodemailer-express-handlebars";

import { config } from "../config/configs"; // Ваши переменные окружения
import { allTemplate } from "../constants/email.constants";
import { EmailAction } from "../enums/email.enum";
import { ApiError } from "../utils/apiError";

class EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email_templates",
          "layouts",
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email_templates",
          "partials",
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email_templates", "views"),
      extname: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string,
    emailAction: EmailAction,
    name: string,
    actionToken: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    try {
      const { template, subject } = allTemplate[emailAction];

      const appUrl = config.APP_URL;

      const mailOptions = {
        to: email,
        subject: subject,
        template: template,
        context: {
          name: name,
          token: actionToken,
          appUrl: appUrl,
        },
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new ApiError(error.message, error.status);
    }
  }
}

export const emailService = new EmailService();
