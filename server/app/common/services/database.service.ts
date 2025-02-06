import mongoose from "mongoose";

/**
 * Initializes the database connection.
 *
 * @returns {Promise<boolean>} Resolves to true if the database connection is
 * successful, false otherwise.
 *
 * @throws {Error} If the `MONGODB_URI` environment variable is not set.
 */
export const initDB = async (): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const mongodbUri = process.env.MONGODB_URI || "";
    // console.log(mongodbUri);
    if (mongodbUri === "") throw new Error("mongod db uri not found!");
    // mongoose.set("debug", true);
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongodbUri)
      .then(() => {
        console.log("DB Connected!");
        resolve(true);
      })
      .catch(reject);
  });
};
