import * as authService from "./auth.service";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import { type Request, type Response } from "express";

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  const result = await authService.refreshAccessToken(token);
  res.status(result.status).send(createResponse(result.data));
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    // console.log(email);
    // await authService.forgotPassword(email);
    const result = await authService.forgotPassword(email);
    res.send(createResponse(result.data));
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password, id } = req.body; // Get the new password from request body
    console.log(id, password);
    await authService.resetPassword(id, password);

    res.send(createResponse("Password successfully reset"));
  }
);
