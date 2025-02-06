import { Router } from "express";
import * as userControl from "./user.control";
import * as userValidate from "./user.validate";
import { catchError } from "../common/middleware/cath-error.middleware";
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";
import { userEnum } from "./user.dto";
import { isAdmin } from "../common/middleware/isAdmin.middleware";
const router = Router();
/**
 * POST /signUp - Route for user registration (sign up).
 * Validates input data using `userValidate.signUpValidator`, catches errors using `catchError`, and calls `userControl.signUp`.
 *
 * @function
 * @name POST /signUp
 * @middlewares
 *   - userValidate.signUpValidator
 *   - catchError
 *   - userControl.signUp
 */
router.post(
  "/signUp",
  userValidate.signUpValidator,
  catchError,
  userControl.signUp
);
/**
 * POST /signIn - Route for user sign in.
 * Validates input data using `userValidate.signInValidator`, catches errors using `catchError`, and calls `userControl.signIn`.
 *
 * @function
 * @name POST /signIn
 * @middlewares
 *   - userValidate.signInValidator
 *   - catchError
 *   - userControl.signIn
 */
router.post(
  "/signIn",
  userValidate.signInValidator,
  catchError,
  userControl.signIn
);

/**
 * GET /allUser - Route to get all users (only accessible by admin).
 * Uses `isAdmin` middleware to ensure the user has the necessary admin role and calls `userControl.getAllUsers`.
 *
 * @function
 * @name GET /allUser
 * @middlewares
 *   - isAdmin([...userEnum])
 *   - userControl.getAllUsers
 */
router.get("/allUser", isAdmin([...userEnum]), userControl.getAllUsers);

/**
 * GET /getUserById - Route to get a user by ID.
 * Uses `roleAuthMiddleware` to check the role-based authorization and calls `userControl.getUserById`.
 *
 * @function
 * @name GET /getUserById
 * @middlewares
 *   - roleAuthMiddleware([...userEnum])
 *   - userControl.getUserById
 */
router.get(
  "/getUserById",
  roleAuthMiddleware([...userEnum]),
  userControl.getUserById
);
/**
 * GET /get - Route to get a user by email (only accessible by admin).
 * Uses `isAdmin` middleware and calls `userControl.getUserByEmail`.
 *
 * @function
 * @name GET /get
 * @middlewares
 *   - isAdmin([...userEnum])
 *   - userControl.getUserByEmail
 */
router.get("/get", isAdmin([...userEnum]), userControl.getUserByEmail);

/**
 * PATCH /update - Route to update a user's details.
 * Uses `roleAuthMiddleware` for role-based authorization, validates data with `userValidate.updateValidator`, and handles errors with `catchError`. It then calls `userControl.update`.
 *
 * @function
 * @name PATCH /update
 * @middlewares
 *   - roleAuthMiddleware([...userEnum])
 *   - userValidate.updateValidator
 *   - catchError
 *   - userControl.update
 */
router.patch(
  "/update",
  roleAuthMiddleware([...userEnum]),
  userValidate.updateValidator,
  catchError,
  userControl.update
);
/**
 * DELETE /delete - Route to delete a user.
 * Uses `roleAuthMiddleware` for role-based authorization and calls `userControl.userDelete`.
 *
 * @function
 * @name DELETE /delete
 * @middlewares
 *   - roleAuthMiddleware([...userEnum])
 *   - userControl.userDelete
 */

router.delete(
  "/delete",
  roleAuthMiddleware([...userEnum]),
  userControl.userDelete
);
/**
 * GET /logout - Route to log a user out.
 * Uses `roleAuthMiddleware` to authorize based on roles and calls `userControl.logout`.
 *
 * @function
 * @name GET /logout
 * @middlewares
 *   - roleAuthMiddleware([...userEnum])
 *   - userControl.logout
 */
router.get("/logout", roleAuthMiddleware([...userEnum]), userControl.logout);
export default router;
