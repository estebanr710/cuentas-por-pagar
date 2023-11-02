import { check }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

const validatorCreateNote = [
    check("invoice_id", "Invalid invoice_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("user_id", "Invalid user_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("not_description", "Invalid not_description [min_length: 5, max_length: 300]").exists().notEmpty().isLength({ min: 5, max: 300 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export default validatorCreateNote;