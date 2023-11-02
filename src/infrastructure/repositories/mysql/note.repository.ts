import { NoteRepository } from "../../../domain/note/note.repository";

import Note from "../../models/local.notes.schema";

import { MySqlInvoiceRepository } from "./invoice.repository";
import { MySqlUserRepository } from "./user.repository";

export class MySqlNoteRepository implements NoteRepository {

    constructor (private mysqlInvoiceRepository = new MySqlInvoiceRepository, private mysqlUserRepository = new MySqlUserRepository) { }

    async registerNote(noteMock: any): Promise<any> {
        let { invoice_id, user_id } = noteMock;
        if (!await this.mysqlInvoiceRepository.findInvoiceById(invoice_id)) {
            return 'INVOICE_NOT_FOUND';
        }
        if (!await this.mysqlUserRepository.listUserByIdV2(user_id)) {
            return 'USER_NOT_FOUND';
        }
        const NOTE = await Note.create(noteMock);
        return NOTE;
    }
}