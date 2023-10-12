import { Request, Response, Router } from "express";
import { MySqlUserRepository } from "../repositories/mysql/user.repository";
import { UserUseCase } from "../../application/user.use.case";
import { UserController } from "../controllers/user.controller";

const ROUTER = Router();

const userReposotory = new MySqlUserRepository();
const userUseCase = new UserUseCase(userReposotory);
const userController = new UserController(userUseCase);

ROUTER.get("/", userController.getController);

ROUTER.post("/", userController.insertController);

export { ROUTER };