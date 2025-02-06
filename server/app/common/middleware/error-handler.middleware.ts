import { type ErrorRequestHandler } from "express";
import { type ErrorResponse } from "../helper/response.helper";

/**
 * Global error handler middleware.
 *
 * @param {Error} err - The error object which contains the status and message of the error.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware in the stack.
 *
 * @description
 * This middleware handles the errors that are thrown by the application.
 * It formats the error into a response object and sends it to the client.
 * It also calls the next middleware in the stack.
 *
 * @example
 * app.use(errorHandler);
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const response: ErrorResponse = {
    success: false,
    error_code: (err?.status ?? 500) as number,
    message: (err?.message ?? "Something went wrong!") as string,
    data: err?.data ?? {},
  };

  res.status(response.error_code).send(response);
  next();
};

export default errorHandler;
