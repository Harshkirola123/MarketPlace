import rateLimit from "express-rate-limit";

/**
 * Middleware to limit repeated requests to public APIs.
 *
 * This rate limiter restricts each IP address to a maximum number of requests
 * within a specified time window. If the limit is exceeded, an error message
 * is returned to the client.
 *
 * @constant
 * @type {RateLimit}
 * @default
 * @property {number} windowMs - Time frame for which requests are checked/remembered in milliseconds.
 * @property {number} max - Maximum number of requests allowed per `windowMs`.
 * @property {string} message - Message to send when the rate limit is exceeded.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
