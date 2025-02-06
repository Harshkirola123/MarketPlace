import { Router } from "express";
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.routes";
import projectRoutes from "./project/project.routes";
import transactionRoutes from "./payment/payment.route";
import feedbackRoutes from "./feedback/feedback.route";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";

/**
 * Use the respective route handlers for the following endpoints:
 *
 * - `/user` - User operations.
 * - `/auth` - Authentication operations.
 * - `/project` - Project operations.
 * - `/payment` - Payment transaction operations.
 * - `/feedback` - Feedback operations.
 */
const router = Router();

const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../swagger/swagger_output.json"),
    "utf8"
  )
);

/**
 * Use the respective route handlers for the following endpoints:
 *
 * - `/user` - User operations.
 * - `/auth` - Authentication operations.
 * - `/project` - Project operations.
 * - `/payment` - Payment transaction operations.
 * - `/feedback` - Feedback operations.
 */
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Use the respective route handlers for the following endpoints:
 *
 * - `/user` - User operations.
 * - `/auth` - Authentication operations.
 * - `/project` - Project operations.
 * - `/payment` - Payment transaction operations.
 * - `/feedback` - Feedback operations.
 */
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/project", projectRoutes);
router.use("/payment", transactionRoutes);
router.use("/feedback", feedbackRoutes);

export default router;
