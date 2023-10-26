import { check }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

const validatorCreateState = [
    check("sta_description", "Invalid sta_description [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export default validatorCreateState;