import { Router } from "express";

import authMiddleware from "../middlewares/jwt.middleware";
import { ReportController } from "../controllers/report.controller";

let reportController = new ReportController();

const ROUTER = Router();

ROUTER.get("/", 
    authMiddleware, 
    reportController.generateController
);

export { ROUTER };