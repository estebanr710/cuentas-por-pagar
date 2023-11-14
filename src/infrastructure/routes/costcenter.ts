import { Router } from "express";

// MySql Repository
import { MySqlCostCenterRepository } from "../repositories/mysql/costcenter.repository"; 
// Use Case
import { CostCenterUseCase } from "../../application/costcenter.use.case"; 
// Controller
import { CostCenterController } from "../controllers/costcenter.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";
import { validatorCreateCostCenter } from "../validators/costcenter.validator";

const ROUTER = Router();

let cosrCenterReposotory = new MySqlCostCenterRepository();
let cosrCenterUseCase = new CostCenterUseCase(cosrCenterReposotory);
let costCenterController = new CostCenterController(cosrCenterUseCase);

ROUTER.post("/",
    authMiddleware,
    validatorCreateCostCenter,
    costCenterController.insertController
);

export { ROUTER };