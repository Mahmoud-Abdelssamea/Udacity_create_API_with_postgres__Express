import { NextFunction, Request, Response } from "express";
import { validationResult, check, body } from "express-validator";

const newProductValidate = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("product name should be at least 3 charcters"),
    body("price")
      .notEmpty()
      .withMessage("price not available ")
      .isNumeric()
      .withMessage("price should be number"),
    body("category")
      .isLength({ min: 3 })
      .withMessage("category name should be at least 3 carachter"),
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

export { newProductValidate, validation };
