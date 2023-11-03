import { Request, Response } from "express";
import { InvoiceUseCase } from "../../application/invoice.use.case"; 
import { matchedData } from "express-validator";

export class InvoiceController {

    constructor(private invoiceUseCase: InvoiceUseCase) {}

    public insertController = async (req: Request, res: Response) => {
        let { inv_title, inv_email_body, inv_senders_email } = matchedData(req);
        const INVOICE = await this.invoiceUseCase.registerInvoice({ inv_title, inv_email_body, inv_senders_email });
        res.status(201).send(INVOICE);
    }
}