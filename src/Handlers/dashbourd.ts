import { DashboardQueries } from "../services/dashbourd";
import { Request, Response } from "express";

const order = new DashboardQueries();

const currentOrder = async (req: Request, res: Response) => {
  const user_id = String(req.params.user_id);
  const order_id = String(req.params.order_id);
  const token = String(req.headers.authorization).split(" ")[1];
  const response = await order.productsInOrders({ order_id, user_id, token });

  return res.send(response);
};

export { currentOrder };
