import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const ValidateTodo = (): ValidationChain[] => {
  return [
    body("title")
      .isString()
      .withMessage("Title must be a string")
      .notEmpty()
      .withMessage("Title must not be empty")
      .custom((value) => {
        if (!isNaN(Number(value))) {
          throw new Error("Title cannot contain numeric values");
        }
        return true;
      }),

    body("description")
      .isString()
      .withMessage("Description must be a string")
      .notEmpty()
      .withMessage("Description must not be empty")
      .custom((value) => {
        if (!isNaN(Number(value))) {
          throw new Error("Title cannot contain numeric values");
        }
        return true;
      }),
    body("status")
      .isIn(["todo", "in progress", "done"])
      .withMessage('Status must be one of "todo", "in progress", or "done"'),
  ];
};

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ errors: error.array() });
  }
  next();
};
