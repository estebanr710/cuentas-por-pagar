import { Router } from "express";
import { MySqlUserRepository } from "../repositories/mysql/user.repository";
import { UserUseCase } from "../../application/user.use.case";
import { UserController } from "../controllers/user.controller";
import authMiddleware from "../middlewares/jwt.middleware";

const ROUTER = Router();

const userReposotory = new MySqlUserRepository();
const userUseCase = new UserUseCase(userReposotory);
const userController = new UserController(userUseCase);

//ROUTER.get("/", authMiddleware, userController.getController);

ROUTER.post("/", userController.insertController);

export { ROUTER };