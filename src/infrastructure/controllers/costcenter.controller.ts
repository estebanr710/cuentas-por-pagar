import { Request, Response } from "express";
import { CostCenterUseCase } from "../../application/costcenter.use.case";

import { matchedData } from "express-validator";

export class CostCenterController {

    constructor(private costCenterUseCase: CostCenterUseCase) {}

    public getController = async (req: Request, res: Response) => {
        try {
            let costcenter = await this.costCenterUseCase.getCostCenter();
            res.send({ costcenter });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public insertController = async (req: Request, res: Response) => {
        try {
            let { cos_cen_description } = matchedData(req);
            const COST_CENTER = await this.costCenterUseCase.registerCostCenter({ cos_cen_description });
            res.status(201).send(COST_CENTER);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public updateController = async (req: Request, res: Response) => {
        try {
            let { id, cos_cen_state } = matchedData(req);
            const COST_CENTER = await this.costCenterUseCase.changeCostCenterState({ id, cos_cen_state });
            if (COST_CENTER !== "STATE_HAS_BEEN_CHANGED") {
                res.status(403).send({ status: 200, message: "ERROR_CHANGING_COST_CENTER_STATE" });
            } else {
                res.send({ status: 200, message: "COST_CENTER_STATE_HAS_BEEN_UPDATED" });
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}