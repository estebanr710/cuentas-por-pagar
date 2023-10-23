import { AttachmentRepository } from "../../../domain/attachment/attachment.repository";

import Attachment from "../../models/local.attachments.schema";

export class MySqlAttachmentRepository implements AttachmentRepository {

    async registerAttachment(attachmentMock: any): Promise<any> {
        const ATTACHMENT = await Attachment.create(attachmentMock);
        return ATTACHMENT;
    }
    
    async listAttachments(): Promise<any> {
        const ATTACHMENTS = await Attachment.findAll();
        return ATTACHMENTS;
    }

    async listAttachment(id: string): Promise<any | null> {
        const ATTACHMENT = await Attachment.findByPk(id)
        return ATTACHMENT;
    }
}