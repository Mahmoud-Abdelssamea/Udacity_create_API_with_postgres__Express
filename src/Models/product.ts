import { client } from "../database";
import jwt from "jsonwebtoken";
const secritKey = String(process.env.SECRITKEY);

// ==============================================================================
// ============================product Model========================================
// ==============================================================================

export type ProductInput = {
  name: string;
  price: number;
  category: string;
};

export type ProductOutput = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  // =====================================index==================================
  async index() {
    try {
      const conn = await client.connect();
      const text = `SELECT * FROM product`;
      const query = await client.query(text);
      conn.release();
      if (query.rowCount === 0) {
        return `there is no products please add some`;
      }
      return query.rows;
    } catch (error) {
      throw new Error(`can't get Products: ${error}`);
    }
  }

  // =====================================show==================================

  async show(id: string) {
    try {
      // connect with db
      const conn = await client.connect();
      try {
        const text = `SELECT * FROM product WHERE id=${id}`;
        const query = await client.query(text);
        conn.release();

        if (query.rowCount === 0) {
          return `this product not available right now`;
        }
        return query.rows[0];
      } catch (error) {
        return `database connection fail: ${error}`;
      }
    } catch (error) {
      throw new Error(`can't login: ${error}`);
    }
  }

  // =====================================create==================================

  async create(p: ProductInput, token: string, user_id: string) {
    try {
      if (token) {
        const checkUserId = jwt.verify(token, secritKey);
        if (checkUserId) {
          if (String(user_id) === String(checkUserId.id)) {
            //   connect to db
            const conn = await client.connect();

            // send query to database
            const text = `INSERT INTO product (name, price, category) 
              VALUES ($1, $2, $3) RETURNING * `;
            const values = [p.name, p.price, p.category];
            const res = await client.query(text, values);

            // end connection with db
            conn.release();

            // return saved product
            return res.rows[0];
          } else {
            return `invalid token`;
          }
        }
      } else {
        return `token required`;
      }
    } catch (error) {
      return `couldn't add new Product: ${error}`;
    }
  }

  // =====================================delete==================================

  async delete(product_id: string, user_id: string, token: string) {
    try {
      if (token) {
        const checkUserId = jwt.verify(token, secritKey);
        if (checkUserId) {
          if (String(user_id) === String(checkUserId.id)) {
            //   connect to db
            const conn = await client.connect();

            // send query to database
            const text = `DELETE FROM product WHERE id=$1`;
            const values = [product_id];
            await client.query(text, values);

            // release connection with db
            conn.release();
            return `Product deleted successfully`;
          } else {
            return `invalid token`;
          }
        }
      } else {
        return `token required`;
      }
    } catch (error) {
      return `couldn't delete Product: ${error}`;
    }
  }
}
