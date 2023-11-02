import { Request, Response } from "express";
import { InvoiceUseCase } from "../../application/invoice.use.case"; 

export class InvoiceController {

    constructor(private invoiceUseCase: InvoiceUseCase) {}

    public insertController = async ({ body }: Request, res: Response) => {
        const INVOICE = await this.invoiceUseCase.registerInvoice(body);
        res.status(201).send(INVOICE);
    }
}