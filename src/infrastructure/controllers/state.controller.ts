import { Request, Response } from "express";
import { StateUseCase } from "../../application/state.use.case";

import { matchedData } from "express-validator";

export class StateController {

    constructor(private stateUseCase: StateUseCase) {}

    public getController = async (req: Request, res: Response) => {
        try {
            let states = await this.stateUseCase.getStates();
            res.send({ states });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public insertController = async (req: Request, res: Response) => {
        try {
            let { sta_description } = matchedData(req);
            const STATE = await this.stateUseCase.registerState({ sta_description });
            res.status(201).send(STATE);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}