import { IxCCEntity } from "./ixcc.entity";
import { v4 as uuid  } from "uuid"; 

export class IxCCValue implements IxCCEntity {
    
    id: string;
    invoice_id: string;
    costcenter_id: string;
    percentage: number;

    constructor({ invoice_id, costcenter_id, percentage }: IxCCEntity) {
        this.id = uuid();
        this.invoice_id = invoice_id;
        this.costcenter_id = costcenter_id;
        this.percentage = percentage;
    }
}