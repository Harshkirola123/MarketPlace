import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { userEnum, type IUser } from "../../user/user.dto";
import { decodeAccessToken } from "../helper/jwt.helper";

/**
 * Middleware function for role-based authorization.
 *
 * @param {IUser["role"][]} roles - An array of user roles that are allowed to access the route.
 * @param {string[]} [publicRoutes=[]] - An array of public route paths that do not require authentication.
 *
 * @returns {Function} An Express middleware function that checks if the user has a valid role
 * and is authorized to access the requested resource. If the route is public, the request
 * proceeds without authentication. If the user does not have a valid token or role, an HTTP
 * error is thrown.
 *
 * @throws {createHttpError} 401 - If the token is missing or the user role is unauthorized.
 * @throws {createHttpError} 403 - If the user role is invalid.
 */
export const isAdmin = (roles: IUser["role"][], publicRoutes: string[] = []) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (publicRoutes.includes(req.path)) {
        next();
        return;
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw createHttpError(401, {
          message: "Token is required for authentication",
        });
      }
      const decodedUser = (await decodeAccessToken(token)) as IUser;

      if (
        !(decodedUser.role === "USER") ||
        !userEnum.includes(decodedUser.role)
      ) {
        throw createHttpError(403, {
          message: "Invalid or unauthorized user role",
        });
      }
      if (!roles.includes(decodedUser.role)) {
        const type =
          decodedUser.role.slice(0, 1) +
          decodedUser.role.slice(1).toLocaleLowerCase();

        throw createHttpError(401, {
          message: `${type} can not access this resource`,
        });
      }

      req.body.id = decodedUser._id;
      next();
    }
  );
