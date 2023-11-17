import { Router } from "express";

import authMiddleware from "../middlewares/jwt.middleware";
import validatorGenerateReport from "../validators/report.validator";
import { ReportController } from "../controllers/report.controller";

let reportController = new ReportController();

const ROUTER = Router();

ROUTER.get("/:simi_state?:state?:from?:to?", 
    authMiddleware, 
    validatorGenerateReport,
    reportController.generateController
);

export { ROUTER };