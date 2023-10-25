import { AttachmentEntity } from "../domain/attachment/attachment.entity";
import { AttachmentRepository } from "../domain/attachment/attachment.repository";
import { AttachmentValue } from "../domain/attachment/attachment.value";

export class AttachmentUseCase {

    constructor(private readonly attachmentRepository: AttachmentRepository) { }

    public registerAttachment = async ({ invoice_id, att_name, att_extension, att_relative_path }: AttachmentEntity) => {
        let attachmentValue = new AttachmentValue({ invoice_id, att_name, att_extension, att_relative_path });
        let attachmentCreated = await this.attachmentRepository.registerAttachment(attachmentValue);
        return attachmentCreated;
    }

    public getAttachments = async (invoice_id: string) => {
        const ATTACHMENTS = await this.attachmentRepository.listAttachments(invoice_id);
        return ATTACHMENTS;
    }

    public getAttachment = async (id: string) => {
        const ATTACHMENT = await this.attachmentRepository.listAttachment(id);
        return ATTACHMENT;
    }
}