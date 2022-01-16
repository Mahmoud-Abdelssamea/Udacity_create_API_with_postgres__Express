import { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";

const newUserValidate = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("firstName not available ")
      .isLength({ min: 3 })
      .withMessage("user firstName should be at least 3 charcters"),
    body("lastName")
      .notEmpty()
      .withMessage("lastName not available ")
      .isLength({ min: 3 })
      .withMessage("user lastName should be at least 3 charcters"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("password should be at least 3 characters "),
  ];
};

// ==================================================================

const validation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    errors: errors.array(),
  });
};

export { newUserValidate, validation };
