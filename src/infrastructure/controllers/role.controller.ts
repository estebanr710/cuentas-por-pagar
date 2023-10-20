import { Request, Response } from "express";
import { RoleUseCase } from "../../application/role.use.case";

import { matchedData } from "express-validator";

export class RoleController {

    constructor(private roleUseCase: RoleUseCase) {}

    public getController = async (req: Request, res: Response) => {
        try {
            let roles = await this.roleUseCase.getRoles();
            res.send({ roles });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public insertController = async (req: Request, res: Response) => {
        try {
            let { rol_description } = matchedData(req);
            const ROLE = await this.roleUseCase.registerRole({ rol_description });
            res.status(201).send(ROLE);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}