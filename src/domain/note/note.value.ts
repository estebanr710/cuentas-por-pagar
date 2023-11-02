import { NoteEntity } from "./note.entity";
import { v4 as uuid  } from "uuid"; 
import now from "../../infrastructure/handlers/handle.now";

export class NoteValue implements NoteEntity {
    
    id: string;
    invoice_id: string;
    user_id: string;
    not_description: string;
    not_type: string;
    not_datetime: Date;

    constructor({ invoice_id, user_id, not_description, not_type }: NoteEntity) {
        this.id = uuid();
        this.invoice_id = invoice_id;
        this.user_id = user_id;
        this.not_description = not_description;
        this.not_type = not_type ? not_type : 'OBSERVATION';
        this.not_datetime = now();
    }
}