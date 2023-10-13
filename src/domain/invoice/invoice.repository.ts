import { InvoiceEntity } from "./invoice.entity";

export interface InvoiceRepository {
    findInvoiceById(id: string): Promise<InvoiceEntity | null>;
    registerInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity | null>;
    listInvoices(): Promise<InvoiceEntity[] | null>;
}