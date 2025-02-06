import { type IUser } from "./user.dto";
import User from "./user.schema";
import { generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import brcypt from "bcryptjs";

/**
 * Registers a new user in the system.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user account.
 * @param {string} role - The role assigned to the user.
 * @returns {Promise<{status: number, data: {message: string, user: IUser, accessToken: string, refreshToken: string}}>}
 * An object containing the status code and data, which includes a success message,
 * the created user object, an access token, and a refresh token.
 * @throws Will throw an error if the user already exists.
 */

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const existingUser = await User.findOne({ email });
  // console.log(existingUser);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await brcypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user);

  user.refToken = refreshToken;
  await user.save();
  return {
    status: 200,
    data: {
      message: "User SignUp successfully",
      user,
      accessToken,
      refreshToken,
    },
  };
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user account.
 * @returns {Promise<{status: number, data: {message: string, user: Omit<IUser, "password" | "refToken">, refreshToken: string, accessToken: string}}>}
 * An object containing the status code and data, which includes a success message,
 * the logged in user object (without password and refreshToken fields), a refresh
 * token, and an access token.
 * @throws Will throw an error if the user does not exist, the password is incorrect,
 * or if the user is already logged in from another device.
 */
export const signInUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await brcypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }
  if (user.refToken) {
    throw new Error("User is already logged in from another device");
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user);

  user.refToken = refreshToken;
  await user.save();
  const newUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return {
    status: 200,
    data: {
      message: "User SignIn successfully",
      user: newUser,
      refreshToken,
      accessToken,
    },
  };
};

/**
 * Updates an existing user's details in the system.
 *
 * @param {string} id - The unique identifier of the user to be updated.
 * @param {string} name - The new name for the user.
 * @param {string} email - The new email address for the user.
 * @param {string} role - The new role assigned to the user.
 * @returns {Promise<{status: number, data: {message: string, user: Omit<IUser, "password">}}>}
 * An object containing the status code and data, which includes a success message
 * and the updated user object (without the password field).
 * @throws Will throw an error if the user is not found.
 */

export const updateUser = async (
  id: string,
  name: string,
  email: string,
  role: string
) => {
  // const emailCheck = await User.findOne({ email });
  // if (emailCheck) {
  //   throw new Error("Email already exists");
  // }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, email, role },
    { new: true }
  ).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return {
    status: 200,
    data: {
      message: "User updated successfully",
      user,
    },
  };
};

/**
 * Deletes an existing user from the system.
 *
 * @param {string} id - The unique identifier of the user to be deleted.
 * @returns {Promise<{status: number, data: {message: string, user: Omit<IUser, "password">}}>}
 * An object containing the status code and data, which includes a success message
 * and the deleted user object (without the password field).
 * @throws Will throw an error if the user is not found.
 */
export const deleteUser = async (id: string) => {
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new Error("User not found");
  }
  return {
    status: 200,
    data: {
      message: "User deleted successfully",
      user,
    },
  };
};

/**
 * Finds a user by their unique identifier.
 *
 * @param {string} id - The unique identifier of the user to be found.
 * @returns {Promise<{status: number, data: {message: string, user: Omit<IUser, "password">}}>}
 * An object containing the status code and data, which includes a success message
 * and the found user object (without the password field).
 * @throws Will throw an error if the user is not found.
 */
export const getUserById = async (id: string) => {
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return {
    status: 200,
    data: {
      message: "User found successfully",
      user,
    },
  };
};

/**
 * Retrieves all users from the system excluding their passwords.
 *
 * @returns {Promise<{status: number, data: {message: string, users: Omit<IUser, "password">[]}}>}
 * An object containing the status code and data, which includes a success message
 * and a list of user objects (without the password field).
 * @throws Will return a server error message if an exception occurs.
 */

export const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return {
      status: 200,
      data: {
        message: "Users found successfully",
        users,
      },
    };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};

/**
 * Finds a user by their email address.
 *
 * @param {string} email - The email address of the user to be found.
 * @returns {Promise<{status: number, data: {message: string, user: Omit<IUser, "password">}}>}
 * An object containing the status code and data, which includes a success message
 * and the found user object (without the password field).
 * @throws Will throw an error if the user is not found.
 */

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return {
    status: 200,
    data: {
      message: "User found successfully",
      user,
    },
  };
};

/**
 * Logs out a user by removing their refresh token.
 *
 * @param {string} userId - The unique identifier of the user to be logged out.
 * @returns {Promise<void>}
 * @throws Will throw an error if the user is not found.
 */
export const logoutUser = async (userId: string) => {
  const fetchUser = await User.findById(userId);

  if (!fetchUser) {
    throw new Error("User not found");
  }

  fetchUser.refToken = undefined;

  await fetchUser.save();

  return;
};
