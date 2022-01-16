import { client } from "../database";
import jwt from "jsonwebtoken";
const secritKey = String(process.env.SECRITKEY);

export type productsOrdersIn = {
  order_id: string;
  user_id: string;
  token: string;
};

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(
    PO: productsOrdersIn
  ): Promise<
    { name: string; price: number; order_id: string; status: string }[] | string
  > {
    try {
      if (PO.token) {
        const checkUserId = jwt.verify(PO.token, secritKey);
        if (String(PO.user_id) === String(checkUserId.id)) {
          const conn = await client.connect();

          const text = `SELECT product.name, product.price, orders.status ,order_product.order_id
        FROM order_product
        INNER JOIN product
        ON product.id = order_product.product_id
        INNER JOIN orders
        ON orders.id = order_product.order_id
        WHERE order_id=$1`;

          const values = [PO.order_id];

          const result = await conn.query(text, values);

          conn.release();

          return result.rows;
        } else {
          return `invalid token`;
        }
      } else {
        return `token required`;
      }
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
