import { CostCenterRepository } from "../../../domain/costcenter/costcenter.repository";

import CostCenter from "../../models/local.costcenter.schema";

export class MySqlCostCenterRepository implements CostCenterRepository {

    async registerCostCenter(costCenterMock: any): Promise<any> {
        const COST_CENTER = await CostCenter.create(costCenterMock);
        return COST_CENTER;
    }
    
    async listCostCenter(): Promise<any> {
        const COST_CENTER = await CostCenter.findAll();
        return COST_CENTER;
    }

    async changeCostCenterState({ id, cos_cen_state }: { id: string; cos_cen_state: boolean; }): Promise<any> {
        const COST_CENTER = await CostCenter.update({ cos_cen_state }, { where: { id } });
        return "STATE_HAS_BEEN_CHANGED";
    }
}