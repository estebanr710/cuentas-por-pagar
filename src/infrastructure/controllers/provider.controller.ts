import { Request, Response } from "express";
import { ProviderUseCase } from "../../application/provider.use.case";

import { matchedData } from "express-validator";

export class ProviderController {

    constructor(private providerUseCase: ProviderUseCase) {}

    public getController = async (req: Request, res: Response) => {
        try {
            let providers = await this.providerUseCase.getProviders();
            res.send({ providers });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public getByIdController = async (req: Request, res: Response) => {
        try {
            let { id } = matchedData(req);
            const PROVIDER = await this.providerUseCase.getProvider(id);
            if (!PROVIDER) {
                res.status(404).send({ status: 404, message: "PROVIDER_NOT_EXISTS" });
            } else {
                res.send(PROVIDER);
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public insertController = async (req: Request, res: Response) => {
        try {
            let { pro_nit, pro_name, pro_email } = matchedData(req);
            const PROVIDER = await this.providerUseCase.registerProvider({ pro_nit, pro_name, pro_email });
            res.status(200).send(PROVIDER);    
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
    
    public updateController = async (req: Request, res: Response) => {
        try {
            let { id, pro_nit, pro_name, pro_email, pro_state } = matchedData(req);
            let provider = await this.providerUseCase.updateProvider({ id, pro_nit, pro_name, pro_email, pro_state });
            if (!provider) {
                res.status(403).send({ status: 403, message: "ERROR_UPDATING_PROVIDER" });
            } else {
                res.status(200).send({ status: 200, message: "PROVIDER_UPDATED" })
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}