import { IxCCRepository } from "../../../domain/ixcc/ixcc.repository";

import IxCC from "../../models/local.ixcc.schema";
import CostCenter from "../../models/local.costcenter.schema";

export class MySqlIxCCRepository implements IxCCRepository {

    async registerIxcc(IxCCMock: any): Promise<any> {
        const IXCC = await IxCC.create(IxCCMock);
        return IXCC;
    }

    async getByInvoice(invoice_id: string): Promise<any> {
        const IXCC = await IxCC.findAndCountAll({
            where: {
                invoice_id
            },
            include: [
                {
                    model: CostCenter
                }
            ]
        });
        return IXCC;
    }

    public async getIxCC({ invoice_id, costcenter_id }: { invoice_id: string, costcenter_id: string }): Promise<any> {
        const IXCC = await IxCC.findOne({ where: { invoice_id, costcenter_id } });
        return IXCC;
    }
}