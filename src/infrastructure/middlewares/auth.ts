import { NextFunction, Request, Response } from "express";

const X_API_KEY = process.env.X_API_KEY;

const customHeader = (req: Request, res: Response, next: NextFunction) => {

    try {

        const API_KEY = req.headers.x_api_key

        if (API_KEY === X_API_KEY) {
            next();
        } else {
            res.status(403);
            res.send({ error: "Provide a valid X_API_KEY" });
        }
    } catch (e) {
        res.status(403)
        res.send({ error: `Something went wrong at AUTH middleware, error: ${e}` });
    }
};

/**
 * @exports function customHeader
 */
export default customHeader;