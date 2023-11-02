import { check }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

const validatorCreateInvoice = [
    check("inv_title", "Invalid inv_title [min_length: 5, max_length: 200]").exists().notEmpty().isLength({ min: 5, max: 200 }),
    check("inv_email_body", "Invalid inv_email_body").exists().notEmpty(),
    check("inv_senders_email", "Invalid inv_senders_email [min_length: 5, max_length: 300]").exists().notEmpty().isLength({ min: 5, max: 100 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export { validatorCreateInvoice };