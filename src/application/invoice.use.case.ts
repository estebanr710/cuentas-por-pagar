import { InvoiceRepository } from "../domain/invoice/invoice.repository"; 
import { InvoiceValue } from "../domain/invoice/invoice.value";
import { InvoiceEntity } from "../domain/invoice/invoice.entity";
import { AddApprovers, ApproverActions, CustomInvoice, FindInvoicesMock } from "../infrastructure/interfaces/main";
import { NoteEntity } from "../domain/note/note.entity";
import { ApproverEntity } from "../domain/approver/approver.entity";

export class InvoiceUseCase {

    constructor(private readonly invoiceRepository: InvoiceRepository) { }

    public registerInvoice = async ({ inv_title, provider_id, inv_email_body, inv_senders_email }: InvoiceEntity) => {

        let invoiceValue = new InvoiceValue({
            inv_title,
            provider_id,
            inv_email_body,
            inv_senders_email
        });

        let invoiceCreated = await this.invoiceRepository.registerInvoice(invoiceValue);
        return invoiceCreated;
    }

    public getInvoices = async (findMock: FindInvoicesMock) => {
        const INVOICES = await this.invoiceRepository.listInvoices(findMock);
        return INVOICES;
    }

    public getInvoice = async (id: string) => {
        const INVOICE = await this.invoiceRepository.findInvoiceById(id);
        return INVOICE;
    }

    public addApprovers = async ({ id, user_id, approvers }: AddApprovers) => {
        const APPROVERS = await this.invoiceRepository.addApprovers({
            id,
            user_id,
            approvers
        });
        return APPROVERS;
    }

    public addNote = async (note: NoteEntity) => {
        const NOTE = await this.invoiceRepository.addNote(note);
        return NOTE;
    }

    public approveInvoice = async (approver: ApproverActions) => {
        const APPROVE = await this.invoiceRepository.approveInvoice(approver);
        return APPROVE;
    }

    public rejectInvoice = async (approver: ApproverActions) => {
        const REJECT = await this.invoiceRepository.rejectInvoice(approver);
        return REJECT;
    }

    public returnInvoice = async (approver: ApproverActions) => {
        const RETURN = await this.invoiceRepository.returnInvoice(approver);
        return RETURN;
    }

    public cancelInvoice = async (approver: ApproverActions) => {
        const CANCEL = await this.invoiceRepository.cancelInvoice(approver);
        return CANCEL;
    }

    public updateInvoice = async (invoice: CustomInvoice) => {
        const UPDATE = await this.invoiceRepository.updateInvoice(invoice);
        return UPDATE;
    }
}