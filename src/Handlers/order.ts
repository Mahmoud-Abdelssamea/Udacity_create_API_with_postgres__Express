import { OrderModel, Order_ProductModel } from "../Models/orders";
import { Request, Response } from "express";

const order = new OrderModel();
const order_Product = new Order_ProductModel();

const createOrder = async (req: Request, res: Response) => {
  const user_id = String(req.params.user_id);
  const status = String(req.body.status);
  const token = String(req.headers.authorization).split(" ")[1];
  const response = await order.create({ user_id, status }, token);
  res.send(response);
};

const deleteOrder = async (req: Request, res: Response) => {
  const { user_id, order_id } = req.params;
  const token = String(req.headers.authorization).split(" ")[1];
  const response = await order.delete(order_id, user_id, token);
  res.send(response);
};

const addProduct = async (req: Request, res: Response) => {
  const user_id = String(req.params.user_id);
  const order_id = String(req.params.order_id);
  const product_id = String(req.body.product_id);
  const quantity = parseInt(req.body.quantity);
  const token = String(req.headers.authorization).split(" ")[1];
  const response = await order_Product.addproduct({
    user_id,
    order_id,
    product_id,
    quantity,
    token,
  });
  res.send(response);
};

export { createOrder, deleteOrder, addProduct };
