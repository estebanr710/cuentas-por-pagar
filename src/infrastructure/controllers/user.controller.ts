import { Request, Response } from "express";
import { UserUseCase } from "../../application/user.use.case";

import { matchedData } from "express-validator";

export class UserController {

    constructor(private userUseCase: UserUseCase) {}

    public getController = async (req: Request, res: Response) => {
        try {
            let users = await this.userUseCase.getUsers();
            res.send({ users });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
    
    public updateController = async (req: Request, res: Response) => {
        try {
            let { id, role_id } = matchedData(req);
            let user = await this.userUseCase.changeUserRole({ id, role_id });
            if (user === "ROLE_NOT_EXISTS") {
                res.status(404).send({ status: 403, message: "ROLE_NOT_EXISTS" });
            } else {
                res.status(200).send({ status: 200, message: "ROLE_UPDATED" })
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public insertController = async (req: Request, res: Response) => {
        try {
            let { use_name, use_email, use_microsoft_id } = matchedData(req);
            const USER = await this.userUseCase.registerUser({ use_name, use_email, use_microsoft_id });
            res.status(200).send(USER);    
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}