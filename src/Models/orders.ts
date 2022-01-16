import { client } from "../database";
import jwt from "jsonwebtoken";
const secritKey = String(process.env.SECRITKEY);

// ==============================================================================
// ============================orders Model========================================
// ==============================================================================

export type OrderInput = {
  user_id: string;
  status: string;
};

export type OrderOutput = {
  id: number;
  user_id: string;
  status: string;
};

export type Order_Product = {
  user_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  token: string;
};

export type Order_ProductOutput = {
  id: number;
  order_id: string;
  product_id: string;
  quantity: number;
};

export class OrderModel {
  // =====================================create==================================

  async create(o: OrderInput, token: string) {
    try {
      if (token) {
        const checkUserId = jwt.verify(token, secritKey);
        if (checkUserId) {
          if (String(o.user_id) === String(checkUserId.id)) {
            //   connect to db
            const conn = await client.connect();

            // send query to database
            const text = `INSERT INTO orders (user_id, status) 
              VALUES ($1, $2) RETURNING * `;
            const values = [o.user_id, o.status];
            const res = await client.query(text, values);
            conn.release();
            return res.rows[0];
          } else {
            return `invalid token`;
          }
        }
      } else {
        return `token required`;
      }
    } catch (error) {
      return `couldn't add new Order: ${error}`;
    }
  }

  // =====================================delete==================================

  async delete(order_id: string, user_id: string, token: string) {
    try {
      if (token) {
        const checkUserId = jwt.verify(token, secritKey);
        if (String(user_id) === String(checkUserId.id)) {
          //   connect to db
          const conn = await client.connect();
          const values = [order_id];
          const text1 = `SELECT * FROM orders WHERE id=$1`;
          // send query to database
          const query = await client.query(text1, values);
          if (query.rowCount !== 0) {
            const text2 = `DELETE FROM orders WHERE id=$1`;
            await client.query(text2, values);
            conn.release();
            return `Order deleted successfully`;
          }
          conn.release();
          return `Order not available`;
          // release connection with db
        } else {
          return `invalid token`;
        }
      } else {
        return `token required`;
      }
    } catch (error) {
      return `couldn't delete Order: ${error}`;
    }
  }
}
// =================================================================================
export class Order_ProductModel {
  async addproduct(OP: Order_Product) {
    try {
      if (OP.token) {
        const checkUserId = jwt.verify(OP.token, secritKey);
        if (checkUserId) {
          if (String(OP.user_id) === String(checkUserId.id)) {
            //   connect to db
            const conn = await client.connect();

            const text1 = `SELECT * FROM orders WHERE id=$1`;

            const value1 = [OP.order_id];
            const query = await client.query(text1, value1);

            const orderStatus = query.rows[0].status;

            if (orderStatus === "active") {
              // send query to database
              const text2 = `INSERT INTO order_product (product_id, order_id, quantity) 
                VALUES ($1, $2, $3) RETURNING * `;
              const values = [OP.product_id, OP.order_id, OP.quantity];
              const res = await client.query(text2, values);
              conn.release();
              return res.rows[0];
            }
            return `Order not active, can't add a product`;
          } else {
            return `invalid token`;
          }
        }
      } else {
        return `token required`;
      }
    } catch (error) {
      return `couldn't add product to this Order: ${error}`;
    }
  }
}
