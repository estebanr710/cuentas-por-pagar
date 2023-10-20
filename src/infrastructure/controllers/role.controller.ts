import { Request, Response } from "express";
import { RoleUseCase } from "../../application/role.use.case";

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

    public insertController = async ({ body }: Request, res: Response) => {
        try {
            let role = await this.roleUseCase.registerRole(body);
            res.status(201).send(role);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}