import { type IUser } from "../../user/user.dto";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

/**
 * Retrieves the access and refresh token from the environment variables.
 *
 * @returns { { REFRESH_TOKEN: string, ACCESS_TOKEN: string } } An object containing the access and refresh tokens.
 */
const getEnvTokens = () => {
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? "";
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? "";

  return { REFRESH_TOKEN, ACCESS_TOKEN };
};

/**
 * Verifies the integrity and authenticity of a JWT using a secret key,
 * and checks for the presence of essential properties in the token payload.
 *
 * @param {string} incomingToken - The JSON Web Token (JWT) to verify.
 * @param {string} tokenSecret - The secret key to validate the token's signature.
 * @returns {object} The payload of the verified token if valid.
 * @throws Will throw an error if the token is invalid or missing required fields.
 */

const checkTokenExpiry = async (incomingToken: string, tokenSecret: string) => {
  try {
    const payload = jwt.verify(incomingToken, tokenSecret);

    if (
      typeof payload !== "object" ||
      payload === null ||
      !payload._id ||
      !payload.role
    ) {
      throw createHttpError(401, {
        message: "Invalid Token",
      });
    }

    return payload;
  } catch (err) {
    throw createHttpError(401, {
      message: "Invalid Token",
    });
  }
};

/**
 * Generates a pair of JWTs: an access token and a refresh token. The access
 * token is valid for a short period of time (1 hour by default) and is used
 * to authenticate and authorize API requests. The refresh token is valid for
 * a longer period of time (7 days by default) and is used to obtain a new
 * access token when the existing one expires.
 *
 * @param {IUser} user - The user object containing the user's ID and role.
 * @param {string} [access] - The duration of the access token in seconds (e.g.
 *   "1h", "2d", etc.). Defaults to 1 hour.
 *
 * @returns {Promise<{accessToken: string, refreshToken: string}>} A promise
 *   resolving to an object containing the access token and the refresh token.
 */
export const generateAccessTokenAndRefreshToken = async (
  user: IUser,
  access: string = "1h"
) => {
  const { REFRESH_TOKEN, ACCESS_TOKEN } = getEnvTokens();

  const payload = {
    _id: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN, {
    expiresIn: "1h", // Access Token expiration time
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN, {
    expiresIn: "7d", // Refresh Token expiration time
  });

  return { accessToken, refreshToken };
};

/**
 * Decodes and verifies the given encrypted access token and returns the
 * user information attached to it. The user information is contained in the
 * payload of the token, which is an object with `_id` and `role` properties.
 *
 * @param {string} encryptedAccessToken - The encrypted access token to be
 *   decoded.
 *
 * @returns {Promise<{_id: string, role: IUser["role"]}>} - A promise resolving
 *   to an object containing the user's ID and role.
 */
export const decodeAccessToken = async (encryptedAccessToken: string) => {
  const { ACCESS_TOKEN } = getEnvTokens();

  // Verify token and attach the user information to the request object
  const payload = checkTokenExpiry(encryptedAccessToken, ACCESS_TOKEN);

  return payload;
};

/**
 * Decodes and verifies the given encrypted refresh token and returns the
 * user information attached to it. The user information is contained in the
 * payload of the token, which is an object with `_id` and `role` properties.
 *
 * @param {string} encryptedRefreshToken - The encrypted refresh token to be
 *   decoded.
 *
 * @returns {Promise<{_id: string, role: IUser["role"]}>} - A promise resolving
 *   to an object containing the user's ID and role.
 */
export const decodeRefreshToken = async (encryptedRefreshToken: string) => {
  const { REFRESH_TOKEN } = getEnvTokens();

  // Verify token and attach the user information to the request object
  const payload = checkTokenExpiry(encryptedRefreshToken, REFRESH_TOKEN);

  return payload;
};
