import bcrypt from "bcrypt";
import { client } from "../database";
import jwt from "jsonwebtoken";
const secritKey = String(process.env.SECRITKEY);
const salt = Number(process.env.SALT);

// ==============================================================================
// ============================user Model========================================
// ==============================================================================

export type UserOutput = {
  id: number;
  firstname: string;
  lastname: string;
};

export type UserInput = {
  firstName: string;
  lastName: string;
  password: string;
};
export class UserModel {
  // =====================================index==================================
  async index(id: string, token: string): Promise<UserOutput[] | string> {
    try {
      if (token) {
        const checkUserId = jwt.verify(token, secritKey);
        if (String(id) === String(checkUserId.id)) {
          const conn = await client.connect();
          const queryText = `SELECT id, firstName, lastName FROM users `;
          const query = await client.query(queryText);
          conn.release();
          return query.rows;
        } else {
          return "invalid token";
        }
      } else {
        throw new Error(`there is no token not allowed to delete user`);
      }
    } catch (error) {
      throw new Error(`can't get users: ${error}`);
    }
  }

  // =====================================show==================================

  async show(u: UserInput) {
    try {
      // connect with db
      const conn = await client.connect();

      // qeury data from database
      const queryText = `SELECT * FROM users WHERE firstName =$1 AND lastName=$2 `;
      const values = [u.firstName, u.lastName];
      const query = await client.query(queryText, values);

      // release connection with db
      conn.release();

      // if firstName and lastName are correct will start checking password
      if (query.rows.length !== 0) {
        const isPasswordCorrect = await bcrypt.compare(
          u.password,
          query.rows[0].password
        );

        // if password correct create a token for user
        if (isPasswordCorrect) {
          const newUser = query.rows[0];
          const id = String(newUser.id);
          const token = jwt.sign(
            { id, firstName: u.firstName, lastName: u.lastName },
            secritKey
          );
          return token;

          // if password is not correct send message to user
        } else {
          return "invalid Credintial";
        }
      } else {
        return "this user maybe not available";
      }
    } catch (error) {
      throw new Error(`can't login: ${error}`);
    }
  }

  // =====================================create==================================

  async create(u: UserInput): Promise<string> {
    try {
      // hashing password
      const hassedPassword: string = await bcrypt.hash(u.password, salt);

      // connect with database
      const conn = await client.connect();

      // insert new user in database
      const queryText = `INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING * `;
      const values = [u.firstName, u.lastName, hassedPassword];
      const query = await client.query(queryText, values);

      // release connection with database
      conn.release();

      // create token
      const newUser = query.rows[0];
      const id = newUser.id;
      const token = jwt.sign(
        { id, firstName: u.firstName, lastName: u.lastName },
        secritKey
      );
      return token;
    } catch (error) {
      throw new Error(`couldn't add new user: ${error}`);
    }
  }

  // =====================================delete==================================

  async delete(id: string, token: string) {
    try {
      if (token) {
        const checkUserId = jwt.verify(token, secritKey);
        if (checkUserId) {
          if (String(id) === String(checkUserId.id)) {
            const conn = await client.connect();
            const queryText = `DELETE FROM users WHERE id=($1)`;
            const values = [id];

            const query = await client.query(queryText, values);
            conn.release();

            if (query.rowCount === 0) {
              return `user not available`;
            }
            return "user deleted successfully";
          } else {
            return "not allowed to delete anther user";
          }
        }
      } else {
        return `there is no token not allowed to delete user`;
      }
    } catch (error) {
      throw new Error(`couldn't delete user: ${error}`);
    }
  }
}
