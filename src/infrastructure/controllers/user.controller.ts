import { Request, Response } from "express";
import { UserUseCase } from "../../application/user.use.case";

export class UserController {

    constructor(private userUseCase: UserUseCase) {}

    /* public getController = async ({ query }: Request, res: Response) => {
        try {
            const { id = '' } = query;
            let user = await this.userUseCase.getDetailUser(`${id}`);
            res.send({ user });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    } */

    public insertController = async ({ body }: Request, res: Response) => {
        let user = await this.userUseCase.registerUser(body);
        res.send({ user });
    }
}