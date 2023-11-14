import { check }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

const validatorCreateCostCenter = [
    check("cos_cen_description", "Invalid cos_cen_description [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateCostCenter = [
    check("id", "Invalid id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("cos_cen_state", "Invalid cos_cen_state [isBoolean]").exists().notEmpty().isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export { validatorCreateCostCenter, validatorUpdateCostCenter };