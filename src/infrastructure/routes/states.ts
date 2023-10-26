import { Router } from "express";

// MySql Repository
import { MySqlStateRepository } from "../repositories/mysql/state.repository"; 
// Use Case
import { StateUseCase } from "../../application/state.use.case"; 
// Controller
import { StateController } from "../controllers/state.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";
import validatorCreateState from "../validators/state.validator";

const ROUTER = Router();

let stateReposotory = new MySqlStateRepository();
let stateUseCase = new StateUseCase(stateReposotory);
let stateController = new StateController(stateUseCase);

ROUTER.post("/",
    authMiddleware,
    validatorCreateState,
    stateController.insertController
);

ROUTER.get("/", 
    authMiddleware,
    stateController.getController
);

export { ROUTER };