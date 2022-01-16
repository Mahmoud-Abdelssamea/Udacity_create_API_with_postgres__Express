import { UserModel } from "../Models/users";
import { Request, Response } from "express";

const user = new UserModel();

// ==========================signUp======================================
const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;

    const response = await user.create({
      firstName,
      lastName,
      password,
    });

    res.send(response);

    // handle error
  } catch (error) {
    throw new Error("can't signup :" + error);
  }
};

// ==========================login=======================================
const login = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;

    const response = await user.show({ firstName, lastName, password });
    res.send(response);
  } catch (error) {
    throw new Error(`can't login : ${error}`);
  }
};

// =========================index all users==========================
const indexUsers = async (req: Request, res: Response) => {
  try {
    const user_id = String(req.params.id);
    const token = String(req.headers.authorization).split(" ")[1];
    const response = await user.index(user_id, token);
    res.send(response);
  } catch (error) {
    throw new Error(`can't index all users: ${error}`);
  }
};

// ====================================delete user==========================
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const token = String(req.headers.authorization).split(" ")[1];
    const respose = await user.delete(user_id, token);
    res.send(respose);
  } catch (error) {
    throw new Error(`can't delete user: ${error}`);
  }
};

//   ====================================================================================
export { signUp, login, indexUsers, deleteUser };
