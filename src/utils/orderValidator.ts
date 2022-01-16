import { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";

const newOrderValidate = () => {
  return [
    body("user_id")
      .isNumeric()
      .withMessage(" user_id should be number")
      .notEmpty()
      .withMessage("user_id should be available"),
    body("product_id")
      .notEmpty()
      .withMessage("product_id not available ")
      .isNumeric()
      .withMessage("product_id should be number"),
    body("quantaty")
      .isNumeric()
      .withMessage("quantaty should be number")
      .notEmpty()
      .withMessage("quantaty should be available"),
    body("status").isString().withMessage("this status should be string"),
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

export { newOrderValidate, validation };
