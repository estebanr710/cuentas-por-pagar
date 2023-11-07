import { ApproverRepository } from "../../../domain/approver/approver.repository";

import Approver from "../../models/local.approvers.schema";

export class MySqlApproverRepository implements ApproverRepository {

    async registerApprover(approverMock: any): Promise<any> {
        const APPROVER = await Approver.create(approverMock);
        return APPROVER;
    }
}