import Project from "./project.schema";
import User from "../user/user.schema";
import Transaction from "../payment/payment.schema";

/**
 * Adds a new project to the database.
 *
 * @param {string} title - The title of the project.
 * @param {string} description - A detailed description of the project.
 * @param {string[]} screenshots - An array of URLs pointing to screenshots of the project.
 * @param {string} sourceCode - The URL to the project's source code.
 * @param {string} shortDescription - A brief description of the project.
 * @param {number} price - The price of the project.
 * @param {string} id - The unique identifier of the user adding the project.
 * @returns {Promise<{status: number, data: {message: string, project: IProject}}>}
 * A promise resolving to an object containing the status code and data,
 * which includes a success message and the newly created project object.
 */

export const addProject = async (
  title: string,
  description: string,
  screenshots: string[],
  sourceCode: string,
  shortDescription: string,
  price: number,
  id: string
) => {
  const newProject = new Project({
    title,
    description,
    sourceCode,
    screenshots,
    owner: id,
    price,
    shortDescription,
  });
  await newProject.save();
  return {
    status: 200,
    data: {
      message: "Project created successfully",
      project: newProject,
    },
  };
};

/**
 * Retrieves all projects from the database.
 *
 * @returns {Promise<{status: number, data: {message: string, projects: IProject[]}}>}
 * A promise resolving to an object containing the status code and data,
 * which includes a success message and an array of project objects.
 */
export const getProjects = async () => {
  const projects = await Project.find().populate("owner");
  return {
    status: 200,
    data: {
      message: "Projects found successfully",
      projects,
    },
  };
};

/**
 * Retrieves all projects owned by a specific user.
 *
 * @param {string} id - The unique identifier of the user whose projects are to be retrieved.
 * @returns {Promise<{status: number, data: {message: string, projects: IProject[]}}>}
 * A promise resolving to an object containing the status code and data, which includes
 * a success message and an array of project objects associated with the user.
 */

export const getUserProjects = async (id: string) => {
  const projects = await Project.find({ owner: id }).populate("owner");
  return {
    status: 200,
    data: {
      message: "Projects found successfully",
      projects,
    },
  };
};

/**
 * Retrieves a project by its unique identifier.
 *
 * @param {string} id - The unique identifier of the project to be retrieved.
 * @returns {Promise<{status: number, data: {message: string, project: IProject}}>}
 * A promise resolving to an object with a status code and data, which includes a success message
 * and the found project object.
 * @throws Will throw an error if the project is not found.
 */
export const getProjectById = async (id: string) => {
  const project = await Project.findById(id).populate("owner", "username");
  // console.log(project);
  if (!project) {
    throw new Error("Project not found");
  }
  return {
    status: 200,
    data: {
      message: "Project Id",
      project,
    },
  };
};

/**
 * Gets all projects purchased by a user.
 *
 * @param {string} id - The id of the user.
 * @returns {Promise<{status: number, data: {message: string, project: IProject[]}}>}
 * A promise resolving to an object containing the status code and data,
 * which includes a success message and an array of project objects.
 * @throws {Error} If no projects are found.
 */
export const getPurchareProject = async (id: string) => {
  // const project = await Transaction.find({ buyerId: id }).populate("Project");
  const project = await Transaction.find({ buyerId: id }).populate("projectId");

  // console.log(project);
  if (!project) {
    throw new Error("Project not found");
  }
  return {
    status: 200,
    data: {
      message: "Project Id",
      project,
    },
  };
};
