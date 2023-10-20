import { NextFunction, Response, Request } from "express";

const { validationResult } = require("express-validator");

const validateResults = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (e: any) {
        res.status(403).send({ errors: e.mapped()});
    }
}

export default validateResults;