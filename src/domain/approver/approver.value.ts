import { ApproverEntity } from "./approver.entity";
import { v4 as uuid  } from "uuid"; 
import now from "../../infrastructure/handlers/handle.now";

export class ApproverValue implements ApproverEntity {
    
    id: string;
    invoice_id: string;
    user_id: string;
    app_state: null;

    constructor({ invoice_id, user_id }: ApproverEntity) {
        this.id = uuid();
        this.invoice_id = invoice_id;
        this.user_id = user_id;
        this.app_state = null;
    }
}