import { Router } from "express";

// MySql Repository
import { MySqlRoleRepository } from "../repositories/mysql/role.repository"; 
// Use Case
import { RoleUseCase } from "../../application/role.use.case"; 
// Controller
import { RoleController } from "../controllers/role.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";
import validatorCreateRole from "../validators/role.validator";

const ROUTER = Router();

const roleReposotory = new MySqlRoleRepository();
const roleUseCase = new RoleUseCase(roleReposotory);
const roleController = new RoleController(roleUseCase);

ROUTER.post("/",
    authMiddleware,
    validatorCreateRole,
    roleController.insertController
);

ROUTER.get("/", 
    authMiddleware,
    roleController.getController
);

export { ROUTER };