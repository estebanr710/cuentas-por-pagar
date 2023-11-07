import { ApproverEntity } from "./approver.entity";

export interface ApproverRepository {
    registerApprover(approver: ApproverEntity): Promise<ApproverEntity | null | string>;
    /* unlinkApprover(id: string): Promise<null | string>;
    updateApprover(approver: ApproverEntity): Promise<null | string>; */
}