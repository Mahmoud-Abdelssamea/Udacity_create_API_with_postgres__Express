import { Router } from "express";
import { addProduct, createOrder, deleteOrder } from "../Handlers/order";
import { currentOrder } from "../Handlers/dashbourd";

const route = Router();

route.post("/users/:user_id/orders/create", createOrder);
route.delete("/users/:user_id/orders/delete/:order_id", deleteOrder);
route.post("/users/:user_id/orders/add/:order_id", addProduct);
route.get("/users/:user_id/orders/show/:order_id", currentOrder);

export default route;
