import { AttachmentEntity } from "./attachment.entity";

export interface AttachmentRepository {
    registerAttachment(attachment: AttachmentEntity): Promise<AttachmentEntity | null | string>;
    listAttachments(invoice_id: string): Promise<AttachmentEntity[] | null>;
    listAttachment(id: string): Promise<AttachmentEntity | null>;
}