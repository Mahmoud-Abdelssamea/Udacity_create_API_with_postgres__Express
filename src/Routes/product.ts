import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  indexProduct,
  showProduct,
} from "../Handlers/product";
import { newProductValidate, validation } from "../utils/productValidator";

const route = Router();

route.post(
  "/users/:user_id/product/create",
  newProductValidate(),
  validation,
  createProduct
);
route.get("/products/index/", indexProduct);
route.get("/products/show/:product_id", showProduct);
route.delete("/users/:user_id/product/delete/:product_id", deleteProduct);

export default route;
