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

const validatorGetInvoices = [
    check("page", "Invalid page [ min: 1 ]").isInt({ min: 1 }).exists().notEmpty(),
    check("size", "Invalid size [ min: 1, max: 50 ]").isInt({ min: 1, max: 50 }).exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorGetInvoice = [
    check("id", "Invalid id [ min: 5, max: 50 ]").isLength({ min: 5, max: 50 }).exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorAddApprovers = [
    check("id", "Invalid id [ min: 5, max: 50 ]").isLength({ min: 5, max: 50 }).exists().notEmpty(),
    check("user_id", "Invalid user_id [ min: 5, max: 50 ]").isLength({ min: 5, max: 50 }).exists().notEmpty(),
    check("approvers", "Invalid approvers [ isArray, min: 1, max: 2 ]").isArray({ min: 1, max: 2 }).exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorAddCostCenter = [
    check("id", "Invalid id [ min: 5, max: 50 ]").isLength({ min: 5, max: 50 }).exists().notEmpty(),
    check("user_id", "Invalid user_id [ min: 5, max: 50 ]").isLength({ min: 5, max: 50 }).exists().notEmpty(),
    check("costcenter", "Invalid costcenter [ isArray, min: 1 ]").isArray({ min: 1 }).exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorAddNote = [
    check("invoice_id", "Invalid invoice_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("user_id", "Invalid user_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("not_description", "Invalid not_description [min_length: 5, max_length: 300]").exists().notEmpty().isLength({ min: 5, max: 300 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorApproveInvoice = [
    check("invoice_id", "Invalid invoice_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("user_id", "Invalid user_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("inv_amount", "Invalid inv_amount [isNumeric , min: 1]").exists().notEmpty().isInt({ min: 1 }),
    check("observation", "Invalid observation [min_length: 5, max_length: 300]").exists().notEmpty().isLength({ min: 5, max: 300 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorApproverActions = [
    check("invoice_id", "Invalid invoice_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("user_id", "Invalid user_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("observation", "Invalid observation [min_length: 5, max_length: 300]").exists().notEmpty().isLength({ min: 5, max: 300 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateInvoice = [
    check("id", "Invalid id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    check("inv_title", "Invalid inv_title [min_length: 5, max_length: 200]").optional().notEmpty().isLength({ min: 5, max: 200 }),
    check("provider_id", "Invalid provider_id [min_length: 5, max_length: 50]").optional().notEmpty().isLength({ min: 5, max: 50 }),
    check("state_id", "Invalid state_id [min_length: 5, max_length: 50]").optional().notEmpty().isLength({ min: 5, max: 50 }),
    check("inv_cp_simi", "Invalid inv_cp_simi [min_length: 1, max_length: 20]").optional().notEmpty().isLength({ min: 1, max: 20 }),
    check("inv_simi_state", "Invalid inv_simi_state [isBoolean]").optional().notEmpty().isBoolean(),
    check("inv_amount", "Invalid inv_amount [isNumeric , min: 1]").optional().notEmpty().isInt({ min: 1 }),
    check("user_id", "Invalid user_id [min_length: 5, max_length: 50]").exists().notEmpty().isLength({ min: 5, max: 50 }),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next);
    }
];

export {
    validatorCreateInvoice,
    validatorGetInvoices,
    validatorGetInvoice,
    validatorAddApprovers,
    validatorAddNote,
    validatorApproveInvoice,
    validatorApproverActions,
    validatorUpdateInvoice,
    validatorAddCostCenter
};