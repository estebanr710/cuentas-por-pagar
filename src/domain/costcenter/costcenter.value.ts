import { CostCenterEntity } from "./costcenter.entity";
import { v4 as uuid  } from "uuid"; 

export class CostCenterValue implements CostCenterEntity {
    
    id: string;
    cos_cen_description: string;
    cos_cen_state: boolean;

    constructor({ cos_cen_description }: CostCenterEntity) {
        this.id = uuid();
        this.cos_cen_description = cos_cen_description;
        this.cos_cen_state = true;
    }
}