import { Request, Response } from "express";
import { UserUseCase } from "../../application/user.use.case";

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    public async getController({ query }: Request, res: Response) {
        const { id = '' } = query;
        const USER = await this.userUseCase.getDetailUser(`${id}`);
        res.send({ USER });
    }

    public async insertController({ body }: Request, res: Response) {
        const USER = await this.userUseCase.registerUser(body);
        res.send({ USER });
    }
}