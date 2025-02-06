import express from "express";
import {
  addNewProject,
  getAllProject,
  getProjectById,
  getUserProject,
  getUserPurchareProject,
} from "./project.control";
import upload from "../common/middleware/Upload";
import { roleAuthMiddleware } from "../common/middleware/role-auth.middleware";
import { userEnum } from "../user/user.dto";
import multer from "multer";

const router = express.Router();
const uploads = multer({ dest: "uploads/" });
// Upload ZIP + images
router.post(
  "/addProjects",
  uploads.fields([
    { name: "sourceCode", maxCount: 1 }, // Accept only 1 ZIP file
    { name: "screenshots", maxCount: 5 }, // Accept up to 5 images
  ]),
  roleAuthMiddleware([...userEnum]),
  addNewProject
);

router.get("/allProjects", getAllProject);
router.get(
  "/getUserProject",
  roleAuthMiddleware([...userEnum]),
  getUserProject
);

router.get(
  "/getBuyProject",
  roleAuthMiddleware([...userEnum]),
  getUserPurchareProject
);
router.post(
  "/userProjects/:projectId",
  roleAuthMiddleware([...userEnum]),
  getProjectById
);

export default router;
