import { check }  from "express-validator";
import { Request, Response, NextFunction } from "express";

import validateResults from "../handlers/handle.validator";

let validatorCreateAttachment = [
    check("invoice_id", "Invalid invoice_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("att_name", "Invalid att_name [min_length: 5, max_length: 100]").exists().notEmpty().isLength({ min: 5, max: 100 }),
    check("att_extension", "Invalid att_extension [min_length: 1, max_length: 10]").exists().notEmpty().isLength({ min: 1, max: 10 }),
    check("att_relative_path", "Invalid att_relative_path [min_length: 10, max_length: 255]").exists().notEmpty().isLength({ min: 10, max: 255 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

let validatorGetAttachmentById = [
    check("id", "Invalid invoice_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

let validatorGetAttachmentsByInvoiceId = [
    check("invoice_id", "Invalid invoice_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export { validatorCreateAttachment, validatorGetAttachmentById, validatorGetAttachmentsByInvoiceId };