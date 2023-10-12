
/**
 * @implements {function} jsonwebtoken/sign 
 * @implements {function} jsonwebtoken/verify
 * @implements {module} express/Request
*/
import { Request } from "express";
import { sign, verify } from "jsonwebtoken";

/**
 * Constant provided by `.env` file.
 * @constant {string} JWT_SECRET
 * @description JSON Web Token
 */
const JWT_SECRET = process.env.JWT_SECRET ?? '';

/**
 * Function that receives the information from the user that makes the `HTTP` request and generates the `JWT` signed by the user and the `JWT_SECRET`.
 * 
 * @param {object} req Object containing the information of the user making the request.
 * 
 * @returns {string} Returns the `JWT` signed by the user making the request.
 */
const generateToken = (req: Request) => {

    const JWT = sign({}, JWT_SECRET, {
        expiresIn: "1h",
    });

    return JWT as string;
};

/**
 * Validates that the generated JWT is correctly signed.
 * 
 * @param {string} jwt JSON Web Token.
 * 
 * @returns {boolean} Returns `true` if the `JWT` was successfully signed.
 */
const verifyToken = (jwt: string) => {

    const isOk = verify(jwt, JWT_SECRET);
    
    return isOk;
};

/**
 * @exports function generateToken
 * @exports function verifyToken
 */
export { generateToken, verifyToken };