import { FindInvoicesMock } from "../../infrastructure/interfaces/main";
import { NoteEntity } from "../note/note.entity";
import { InvoiceEntity } from "./invoice.entity";

export interface InvoiceRepository {
    findInvoiceById(id: string): Promise<InvoiceEntity | null>;
    registerInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity | null>;
    listInvoices(findMock: FindInvoicesMock): Promise<InvoiceEntity[] | null>;
    updateInvoice(invoice: InvoiceEntity): Promise<string | null>;
    addApprovers({ id, approvers }: { id: string, approvers: string[] }): Promise<string | null>;
    addNote(note: NoteEntity): Promise<string | null>;
}