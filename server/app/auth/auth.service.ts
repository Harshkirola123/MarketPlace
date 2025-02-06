import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../user/user.schema"; // Import your User model
import { generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import * as mailService from "../common/services/email.service";
import { IUser } from "../user/user.dto";
import bcrypt from "bcryptjs";

interface JwtPayload {
  _id: string;
  email: string;
  name: string;
}

export const refreshAccessToken = async (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN ?? ""
    ) as JwtPayload;

    const user = await User.findById(decoded._id);
    if (!user) {
      console.log(user);
      throw new createHttpError.NotFound("No User Found");
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user);
    user.refToken = refreshToken;
    await user.save();
    return {
      status: 200,
      data: {
        message: "Access token refreshed successfully",
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    throw new createHttpError.Unauthorized("Invalid or Expired Refresh Token");
  }
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(403, {
      message: "Invalid or unauthorized user",
    });
  }

  const { accessToken } = await generateAccessTokenAndRefreshToken(user);

  const resetURL = `${process.env.FE_BASE_URL}/reset-password?token=${accessToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password: ${resetURL}`,
  };

  await mailService.sendEmail(mailOptions);
  return {
    status: 200,
    data: {
      message: "Password reset email sent successfully",
      accessToken,
    },
  };
};

export const resetPassword = async (id: string, newPassword: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(403, {
      message: "Invalid or unauthorized user role",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return;
};
