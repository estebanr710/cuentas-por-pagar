import { CostCenterEntity } from "../domain/costcenter/costcenter.entity";
import { CostCenterRepository } from "../domain/costcenter/costcenter.repository";
import { CostCenterValue } from "../domain/costcenter/costcenter.value";

export class CostCenterUseCase {

    constructor(private readonly costCenterRepository: CostCenterRepository) { }

    public registerCostCenter = async ({ cos_cen_description }: CostCenterEntity) => {
        let costCenterValue = new CostCenterValue({ cos_cen_description });
        let costCenterCreated = await this.costCenterRepository.registerCostCenter(costCenterValue);
        return costCenterCreated;
    }

    public getCostCenter = async () => {
        const COST_CENTER = await this.costCenterRepository.listCostCenter();
        return COST_CENTER;
    }
    
    public changeCostCenterState = async ({ id, cos_cen_state }: { id: string, cos_cen_state: boolean }) => {
        const COST_CENTER = await this.costCenterRepository.changeCostCenterState({ id, cos_cen_state });
        return COST_CENTER;
    }
}