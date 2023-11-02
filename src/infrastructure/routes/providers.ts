import { Router } from "express";

// MySql Repository
import { MySqlProviderRepository } from "../repositories/mysql/provider.repository"; 
// Use Case
import { ProviderUseCase } from "../../application/provider.use.case"; 
// Controller
import { ProviderController } from "../controllers/provider.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";
import { validatorCreateProvider, validatorGetProvider, validatorUpdateProvider } from "../validators/provider.validator";


const ROUTER = Router();

let providerReposotory = new MySqlProviderRepository();
let providerUseCase = new ProviderUseCase(providerReposotory);
let providerController = new ProviderController(providerUseCase);

ROUTER.post("/",
    authMiddleware,
    validatorCreateProvider,
    providerController.insertController
);

ROUTER.get("/", 
    authMiddleware,
    providerController.getController
);

ROUTER.get("/:id", 
    authMiddleware,
    validatorGetProvider,
    providerController.getByIdController
);

ROUTER.put("/", 
    authMiddleware,
    validatorUpdateProvider,
    providerController.updateController
);

export { ROUTER };