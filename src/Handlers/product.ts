import { ProductModel } from "../Models/product";
import { Request, Response } from "express";

const product = new ProductModel();

const createProduct = async (req: Request, res: Response) => {
  const user_id = String(req.params.user_id);
  const name = String(req.body.name);
  const price = Number(req.body.price);
  const category = String(req.body.category);
  const token = String(req.headers.authorization).split(" ")[1];
  const response = await product.create(
    { name, price, category },
    token,
    user_id
  );
  res.send(response);
};

const indexProduct = async (req: Request, res: Response) => {
  const response = await product.index();
  res.send(response);
};

const showProduct = async (req: Request, res: Response) => {
  const product_id = req.params.product_id;
  const response = await product.show(product_id);
  res.send(response);
};

const deleteProduct = async (req: Request, res: Response) => {
  const { user_id, product_id } = req.params;
  const token = String(req.headers.authorization).split(" ")[1];
  const response = await product.delete(product_id, user_id, token);
  res.send(response);
};
export { createProduct, indexProduct, showProduct, deleteProduct };
