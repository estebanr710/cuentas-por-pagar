import { ApproverEntity } from "./approver.entity";

export interface ApproverRepository {
    registerApprover(approver: ApproverEntity): Promise<ApproverEntity | null | string>;
    updateApprover(approver: ApproverEntity): Promise<null | string>;
    getByInvoice(id: string): Promise<any>;
    deleteApprover(id: string): Promise<null | string>;
}