import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { initDB } from "./app/common/services/database.service";
import { loadConfig } from "./app/common/helper/config.helper";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import { apiLimiter } from "./app/common/middleware/rate-limiter.middleware";
import { IUser } from "./app/user/user.dto";
import path from "path";

loadConfig();

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}

const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();
app.use("/uploads/images/", express.static(path.join(__dirname, "uploads")));

app.get("/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", "files", fileName);

  res.download(filePath, (err) => {
    if (err) {
      res.status(500).send("Failed to download the file.");
    }
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(apiLimiter);
app.use(
  cors({
    origin: process.env.FE_BASE_URL,
    credentials: true,
  })
);

/**
 * Initializes the application.
 *
 * It initializes the MongoDB database, sets up the API routes and listens to the specified port.
 *
 * @returns {Promise<void>}
 */
const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();

  // set base path to /api
  app.use("/api", router);

  // error handler
  app.use(errorHandler);
  http.createServer(app).listen(port, () => {
    console.log("Server is running on port", port);
  });
};

void initApp();
