import { check, oneOf }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

const validatorCreateProvider = [
    check("pro_nit", "Invalid pro_nit [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("pro_name", "Invalid pro_name [min_length: 5, max_length: 150]").exists().notEmpty().isLength({ min: 5, max: 150 }),
    check("pro_email", "Invalid pro_email [min_length: 5, max_length: 100]").optional().isLength({ min: 5, max: 100 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateProvider = [
    check("id", "Invalid id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("pro_name", "Invalid pro_name [min_length: 5, max_length: 150]").optional().isLength({ min: 5, max: 150 }),
    check("pro_document_type", "Invalid pro_document_type [isInt, min: 1]").optional().isInt({ min: 1 }),
    check("pro_bank", "Invalid pro_bank [isInt, min: 1]").optional().isInt({ min: 1 }),
    check("pro_account_number", "Invalid pro_account_number [min_length: 5, max_length: 100]").optional().isLength({ min: 5, max: 100 }),
    check("pro_account_type").optional().trim(),
    oneOf([
        check('pro_account_type', "Value must be 'AHORROS | CORRIENTE'").equals('AHORROS'),
        check('pro_account_type', "Value must be 'AHORROS | CORRIENTE'").equals('CORRIENTE'),
    ]),
    check("pro_email", "Invalid pro_email [min_length: 5, max_length: 100]").optional().isLength({ min: 5, max: 100 }),
    check("pro_state", "Invalid pro_state [value must be boolean]").optional().isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorGetProvider = [
    check("id", "Invalid id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export { validatorCreateProvider, validatorUpdateProvider, validatorGetProvider };