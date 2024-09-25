import { EmailAction } from "../enums/email.enum";

export const allTemplate = {
  [EmailAction.FORGOT_PASSWORD]: {
    template: "forgot-password",
    subject: "Your password has been sent.",
  },
  [EmailAction.WELCOME]: {
    template: "welcome",
    subject: "Welcome to our service",
  },
  [EmailAction.LOGOUT]: {
    template: "logout",
    subject: "You have logged out",
  },
  [EmailAction.LOGOUT_ALL]: {
    template: "logout-all",
    subject: "You have logged out from all devices",
  },
};
