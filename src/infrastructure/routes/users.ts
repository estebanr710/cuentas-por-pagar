import { Router } from "express";
import { MySqlUserRepository } from "../repositories/mysql/user.repository";
import { UserUseCase } from "../../application/user.use.case";
import { UserController } from "../controllers/user.controller";
import authMiddleware from "../middlewares/jwt.middleware";

const ROUTER = Router();

let userReposotory = new MySqlUserRepository();
let userUseCase = new UserUseCase(userReposotory);
let userController = new UserController(userUseCase);

import { validatorCreateUser, validatorUpdateUserRole } from "../validators/user.validator";

ROUTER.get("/", 
    authMiddleware, 
    userController.getController
);

ROUTER.post("/",
    authMiddleware,
    validatorCreateUser,
    userController.insertController
);

ROUTER.put("/",
    authMiddleware,
    validatorUpdateUserRole,
    userController.updateController
);

export { ROUTER };