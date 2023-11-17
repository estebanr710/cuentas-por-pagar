import { check }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

const validatorGenerateReport = [
    check("simi_state", "Invalid simi_state [isBoolean]").optional().isBoolean(),
    check("state", "Invalid state [ min: 5, max: 50 ]").optional().isLength({ min: 5, max: 50 }),
    check("from", "Invalid from [isDate]").optional().isLength({ min: 10, max: 10 }),
    check("to", "Invalid state [isDate]").optional().isLength({ min: 10, max: 10 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export default validatorGenerateReport;