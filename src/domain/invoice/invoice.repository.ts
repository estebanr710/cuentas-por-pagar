import { FindInvoicesMock } from "../../infrastructure/interfaces/main";
import { InvoiceEntity } from "./invoice.entity";

export interface InvoiceRepository {
    findInvoiceById(id: string): Promise<InvoiceEntity | null>;
    registerInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity | null>;
    listInvoices(findMock: FindInvoicesMock): Promise<InvoiceEntity[] | null>;
    updateInvoice(invoice: InvoiceEntity): Promise<string | null>;
}