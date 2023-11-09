import { ApproverEntity } from "../../../domain/approver/approver.entity";
import { ApproverRepository } from "../../../domain/approver/approver.repository";

import Approver from "../../models/local.approvers.schema";
import User from "../../models/local.users.schema";

export class MySqlApproverRepository implements ApproverRepository {

    async registerApprover(approverMock: any): Promise<any> {
        const APPROVER = await Approver.create(approverMock);
        return APPROVER;
    }
    
    async updateApprover(approver: ApproverEntity): Promise<any> {
        let { user_id, invoice_id, app_state } = approver;
        const APPROVER: any = await Approver.update({ app_state }, {
            where: {
                user_id,
                invoice_id
            }
        });
        return "APPROVER_UPDATED";
    }

    async getByInvoice(invoice_id: string): Promise<any> {
        const APPROVERS = await Approver.findAndCountAll({
            where: {
                invoice_id
            },
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "use_name"
                    ]
                }
            ]
        });
        return APPROVERS;
    }

    public async getApprover({ invoice_id, user_id }: { invoice_id: string, user_id: string }): Promise<any> {
        const APROVER = await Approver.findOne({ where: { invoice_id, user_id } });
        return APROVER;
    }

    async deleteApprover(id: string): Promise<string | null> {
        const APPROVER = await Approver.findByPk(id);
        if (!APPROVER) {
            return "APPROVER_NOT_EXISTS";
        }
        await Approver.destroy({ where: { id } });
        return "APPROVER_DELETED";
    }
}