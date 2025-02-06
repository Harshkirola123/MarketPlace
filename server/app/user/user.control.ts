import * as userService from "./user.service";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";

/**
 * Signs up a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @property {string} name - The name of the user to be created.
 * @property {string} email - The email address of the user to be created.
 * @property {string} password - The password for the user account.
 * @property {string} role - The role assigned to the user.
 *
 * @returns {Promise<void>}
 *
 * @throws Will throw an error if the user already exists.
 */
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await userService.signUpUser(name, email, password, role);
  res.status(result.status).send(createResponse(result.data));
});

/**
 * Signs in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @property {string} email - The email address of the user to be signed in.
 * @property {string} password - The password for the user account.
 *
 * @returns {Promise<void>}
 *
 * @throws Will throw an error if the user does not exist, the password is incorrect,
 * or if the user is already logged in from another device.
 */
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.signInUser(email, password);
  res.status(result.status).send(createResponse(result.data));
});

/**
 * Updates a user's details.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @property {string} id - The unique identifier of the user to be updated.
 * @property {string} name - The new name for the user.
 * @property {string} email - The new email address for the user.
 * @property {string} role - The new role assigned to the user.
 *
 * @returns {Promise<void>}
 *
 * @throws Will throw an error if the user is not found.
 */
export const update = asyncHandler(async (req, res) => {
  const { id, name, email, role } = req.body;
  const result = await userService.updateUser(id, name, email, role);
  res.status(result.status).send(createResponse(result.data));
});

/**
 * Retrieves a user by their ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @property {string} id - The unique identifier of the user to be retrieved, provided in the request body.
 *
 * @returns {Promise<void>}
 *
 * @throws Will throw an error if the user is not found.
 */
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const result = await userService.getUserById(id);
  res.status(result.status).send(createResponse(result.data));
});

/**
 * Retrieves all users from the system.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @returns {Promise<void>}
 *
 * @throws Will return a server error message if an exception occurs.
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(result.status).send(createResponse(result.data));
});

/**
 * Retrieves a user by their email.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @property {string} email - The email address of the user to be retrieved, provided in the request body.
 *
 * @returns {Promise<void>}
 *
 * @throws Will throw an error if the user is not found.
 */
export const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await userService.getUserByEmail(email);
  res.status(result.status).send(createResponse(result.data));
});

/**
 * Deletes an existing user from the system.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @property {string} id - The unique identifier of the user to be deleted, provided in the request body.
 *
 * @returns {Promise<void>}
 *
 * @throws Will throw an error if the user is not found.
 */
export const userDelete = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const result = await userService.deleteUser(id);
  res.status(result.status).send(createResponse(result.data));
});

export const logout = asyncHandler(async (req, res) => {
  await userService.logoutUser(req.body.id);
  res.clearCookie("refreshToken");
  res.status(200).send(createResponse({ message: "Logout successful" }));
});
