import { AttachmentEntity } from "./attachment.entity";
import { v4 as uuid  } from "uuid"; 

export class AttachmentValue implements AttachmentEntity {
    
    id: string;
    invoice_id: string;
    att_name: string;
    att_extension: string;
    att_relative_path: string;

    constructor({ invoice_id, att_name, att_extension, att_relative_path }: AttachmentEntity) {
        this.id = uuid();
        this.invoice_id = invoice_id;
        this.att_name = att_name;
        this.att_extension = att_extension;
        this.att_relative_path = att_relative_path;
    }
}