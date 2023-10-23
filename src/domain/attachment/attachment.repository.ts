import { AttachmentEntity } from "./attachment.entity";

export interface AttachmentRepository {
    registerAttachment(attachment: AttachmentEntity): Promise<AttachmentEntity | null>;
    listAttachments(): Promise<AttachmentEntity[] | null>;
    listAttachment(id: string): Promise<AttachmentEntity | null>;
}