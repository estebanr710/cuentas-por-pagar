import { AddApprovers, AddCostCenter, ApproverActions, CustomInvoice, FindInvoicesMock } from "../../infrastructure/interfaces/main";
import { ApproverEntity } from "../approver/approver.entity";
import { NoteEntity } from "../note/note.entity";
import { InvoiceEntity } from "./invoice.entity";

export interface InvoiceRepository {
    findInvoiceById(id: string): Promise<InvoiceEntity | null>;
    registerInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity | null>;
    listInvoices(findMock: FindInvoicesMock): Promise<InvoiceEntity[] | null>;
    updateInvoice(invoice: CustomInvoice): Promise<string | null>;
    addApprovers({ id, user_id, approvers }: AddApprovers): Promise<string | null>;
    addCostCenter({ id, user_id, costcenter }: AddCostCenter): Promise<string | null>;
    addNote(note: NoteEntity): Promise<string | null>;
    approveInvoice(approver: ApproverActions): Promise<string | null>;
    rejectInvoice(approver: ApproverActions): Promise<string | null>;
    returnInvoice(approver: ApproverActions): Promise<string | null>;
    cancelInvoice(approver: ApproverActions): Promise<string | null>;
}