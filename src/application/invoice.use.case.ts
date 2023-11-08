import { InvoiceRepository } from "../domain/invoice/invoice.repository"; 
import { InvoiceValue } from "../domain/invoice/invoice.value";
import { InvoiceEntity } from "../domain/invoice/invoice.entity";
import { FindInvoicesMock } from "../infrastructure/interfaces/main";
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

    public addApprovers = async ({ id, approvers }: { id: string, approvers: string[] }) => {
        const APPROVERS = await this.invoiceRepository.addApprovers({ id, approvers });
        return APPROVERS;
    }

    public addNote = async (note: NoteEntity) => {
        const NOTE = await this.invoiceRepository.addNote(note);
        return NOTE;
    }

    public approveInvoice = async (approver: ApproverEntity) => {
        const APPROVE = await this.invoiceRepository.approveInvoice(approver);
        return APPROVE;
    }

    public rejectInvoice = async (approver: ApproverEntity) => {
        const REJECT = await this.invoiceRepository.rejectInvoice(approver);
        return REJECT;
    }
}