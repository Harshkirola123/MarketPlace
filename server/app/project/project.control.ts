import * as projectService from "./project.service";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import { Request, Response } from "express";

export const addNewProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, price, shortDescription } = req.body;
    const { id } = req.params; // User ID (assuming it's coming from authenticated user)
    console.log(id);
    // Handle file uploads
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Extract ZIP file
    const sourceCode = files.sourceCode
      ? `/uploads/files/${files.sourceCode[0].filename}`
      : "";

    // Extract screenshots (multiple images)
    const screenshots = files.screenshots
      ? files.screenshots.map((img) => `/uploads/images/${img.filename}`)
      : [];

    console.log(id, title, description, screenshots, price, shortDescription);
    console.log(sourceCode);

    const result = await projectService.addProject(
      title,
      description,
      screenshots,
      sourceCode,
      shortDescription,
      price,
      id
    );

    res.status(result.status).send(createResponse(result.data));
  }
);

export const getAllProject = asyncHandler(async (req, res) => {
  const result = await projectService.getProjects();
  res.status(result.status).send(createResponse(result.data));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  const result = await projectService.getProjectById(projectId);
  res.status(result.status).send(createResponse(result.data));
});
export const getUserProject = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const result = await projectService.getUserProjects(id);
  res.status(result.status).send(createResponse(result.data));
});

export const getUserPurchareProject = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log("Hello");
  const result = await projectService.getPurchareProject(id);
  res.status(result.status).send(createResponse(result.data));
});
