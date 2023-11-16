import { AttachmentRepository } from "../../../domain/attachment/attachment.repository";
import { MySqlInvoiceRepository } from "./invoice.repository";

import Attachment from "../../models/local.attachments.schema";

export class MySqlAttachmentRepository implements AttachmentRepository {

    constructor(private mysqlInvoiceRepository = new MySqlInvoiceRepository) {}

    async registerAttachment(attachmentMock: any): Promise<any> {
        let { invoice_id } = attachmentMock;
        const VALIDATE_INVOICE = await this.mysqlInvoiceRepository.findInvoiceByUUID(invoice_id);
        if (!VALIDATE_INVOICE) {
            return "INVOICE_NOT_FOUND";
        } else {
            const ATTACHMENT = await Attachment.create(attachmentMock);
            return ATTACHMENT;
        }
    }
    
    async listAttachments(invoice_id: string): Promise<any> {
        const ATTACHMENTS = await Attachment.findAll({ where: { invoice_id } });
        return ATTACHMENTS;
    }

    async listAttachment(id: string): Promise<any | null> {
        const ATTACHMENT = await Attachment.findByPk(id)
        return ATTACHMENT;
    }

    async getFileContent(id: string): Promise<any> {
        return null;
    }
}