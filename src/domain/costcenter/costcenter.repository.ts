import { CostCenterEntity } from "./costcenter.entity";

export interface CostCenterRepository {
    registerCostCenter(costCenter: CostCenterEntity): Promise<CostCenterEntity | null>;
    listCostCenter(): Promise<CostCenterEntity[] | null>;
    changeCostCenterState({ id, cos_cen_state }: { id: string, cos_cen_state: boolean }): Promise<string | null>;
}