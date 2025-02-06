import dotenv from "dotenv";
import process from "process";
import path from "path";

/**
 * Loads environment variables from a `.env` file, depending on the value of
 * `NODE_ENV`. If `NODE_ENV` is not set, it defaults to "local".
 *
 * The file is searched for in the current working directory, and the suffix is
 * the value of `NODE_ENV`. For example, if `NODE_ENV` is "production", the file
 * searched for is `.env.production`.
 */
export const loadConfig = () => {
  const env = process.env.NODE_ENV ?? "local";
  const filepath = path.join(process.cwd(), `.env.${env}`);
  // console.log(filepath);
  dotenv.config({ path: filepath });
};
