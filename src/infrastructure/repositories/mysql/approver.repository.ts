import { ApproverRepository } from "../../../domain/approver/approver.repository";

import Approver from "../../models/local.approvers.schema";

import { MySqlInvoiceRepository } from "./invoice.repository";
import { MySqlUserRepository } from "./user.repository";

export class MySqlApproverRepository implements ApproverRepository {

    constructor (private mysqlInvoiceRepository = new MySqlInvoiceRepository, private mysqlUserRepository = new MySqlUserRepository) { }

    async registerApprover(approverMock: any): Promise<any> {
        let { invoice_id, user_id } = approverMock;
        if (!await this.mysqlInvoiceRepository.findInvoiceById(invoice_id)) {
            return 'INVOICE_NOT_FOUND';
        }
        if (!await this.mysqlUserRepository.listUserByIdV2(user_id)) {
            return 'USER_NOT_FOUND';
        }
        const APPROVER = await Approver.create(approverMock);
        return APPROVER;
    }
}