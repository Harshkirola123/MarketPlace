import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";
import { loadConfig } from "../helper/config.helper";

loadConfig();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Sends an email using the pre-configured email transporter.
 *
 * @param {Mail.Options} mailOptions - The options for the email to be sent.
 * @returns {Promise<any>} Resolves with the result of the email sending operation.
 * @throws {http-errors.HttpError} If an error occurs while sending the email.
 */
export const sendEmail = async (mailOptions: Mail.Options): Promise<any> => {
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    createHttpError(500, { message: error.message });
  }
};
