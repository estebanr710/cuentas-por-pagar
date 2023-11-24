export interface AttachmentEntity {
    id?: string,
    invoice_id: string,
    att_name: string,
    att_extension: string,
    att_relative_path: string,
    att_local_relative_path?: string,
}