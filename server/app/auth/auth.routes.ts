import { Router } from "express";
import * as authControl from "./auth.control";
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";
import { userEnum } from "../user/user.dto";
const router = Router();

router.get("/refresh", authControl.refreshToken);
router.post("/forgot-password", authControl.forgotPassword);
router.post(
  "/reset-password",
  roleAuthMiddleware([...userEnum]),
  authControl.resetPassword
);

export default router;
