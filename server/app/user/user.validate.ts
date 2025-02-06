import { body } from "express-validator";

export const signUpValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  body("password").notEmpty().withMessage("password is required"),
  // body("role").notEmpty().withMessage("role is required"),
];
export const signInValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  body("password").notEmpty().withMessage("password is required"),
];

export const updateValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
];
