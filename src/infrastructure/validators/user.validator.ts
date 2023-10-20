import { check }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

const validatorCreateUser = [
    check("use_name", "Invalid use_name [min_length: 5, max_length: 150]").exists().notEmpty().isLength({ min: 5, max: 150 }),
    check("use_email", "Invalid use_email [min_length: 5, max_length: 100]").exists().notEmpty().isLength({ min: 5, max: 100 }),
    check("use_microsoft_id", "Invalid use_microsoft_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateUserRole = [
    check("id", "Invalid id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("role_id", "Invalid role_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export { validatorCreateUser, validatorUpdateUserRole };