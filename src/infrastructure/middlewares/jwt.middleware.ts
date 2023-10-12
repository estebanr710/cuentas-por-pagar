/**
 * @implements {function} verifyToken
 */
import { verifyToken } from "../handlers/handle.jwt";

/**
 * @implements {module} express/NextFunction
 * @implements {module} express/Request
 * @implements {module} express/Response
 * @implements {model} express
 */
import { NextFunction, Request, Response } from "express";
import { UserTA } from "../models/tenant.auth.users.schema";

/**
 * Verify that the user who generated the `JWT` exists in the `tenant` and that the `JWT` is well signed.
 * 
 * @param {object} req Request object provided by `express` module.
 * @param {object} res Response object provided by `express` module.
 * @param {function} next Next function.
 * 
 * @returns {void}
*/
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const JWT_BY_USER = req.headers.authorization ?? '';
        const JWT = JWT_BY_USER.split(" ").pop();
        const IS_USER = verifyToken(`${JWT}`) as { id: string };

        if (!IS_USER) {

            res.status(401);
            res.send("Invalid JWT");
        } else {

            const USER = await UserTA.findOne({ where: { id: IS_USER.id } });
            req.user = USER!;
            next();
        }
    } catch (e) {

        res.status(401).send(`Error: ${e}`);
    }
};

/**
 * @exports function authMiddleware
 */
export default authMiddleware;