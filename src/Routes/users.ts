import { Router } from "express";
import { deleteUser, indexUsers, login, signUp } from "../Handlers/users";
import { validation, newUserValidate } from "../utils/userValidator";

const route = Router();

route.post("/users/signup", newUserValidate(), validation, signUp);
route.post("/users/login", newUserValidate(), validation, login);
route.get("/users/index/:id", indexUsers);
route.delete("/users/delete/:id", deleteUser);

export default route;
