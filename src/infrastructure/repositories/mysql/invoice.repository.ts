import { InvoiceRepository } from "../../../domain/invoice/invoice.repository";

import Invoice from "../../models/local.invoices.schema";

export class MySqlInvoiceRepository implements InvoiceRepository {

    async findInvoiceById(id: string): Promise<any> {
        const INVOICE = await Invoice.findOne({ where: { id } });
        return INVOICE;
    }
    
    async registerInvoice(invoiceMock: any): Promise<any> {
        const INVOICE = await Invoice.create(invoiceMock);
        return INVOICE;
    }
    
    async listInvoices(): Promise<any> {
        const INVOICES = await Invoice.findAll();
        return INVOICES;
    }
}