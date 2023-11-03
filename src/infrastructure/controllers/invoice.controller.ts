import { Request, Response } from "express";
import { InvoiceUseCase } from "../../application/invoice.use.case"; 
import { matchedData } from "express-validator";
import { getPagination } from "../handlers/handle.pagination";

export class InvoiceController {

    constructor(private invoiceUseCase: InvoiceUseCase) {}

    public insertController = async (req: Request, res: Response) => {
        let { inv_title, inv_email_body, inv_senders_email } = matchedData(req);
        const INVOICE = await this.invoiceUseCase.registerInvoice({ inv_title, inv_email_body, inv_senders_email });
        res.status(201).send(INVOICE);
    }

    public getController = async (req: Request, res: Response) => {
        let { page, size } = matchedData(req);
        let { limit, offset } = getPagination(page, size);
        let invoices = await this.invoiceUseCase.getInvoices({ page, size, limit, offset });
        res.send(invoices);
    }
}