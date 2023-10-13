import { Request, Response } from "express";
import { InvoiceUseCase } from "../../application/invoice.use.case"; 

export class InvoiceController {

    constructor(private invoiceUseCase: InvoiceUseCase) {}

    public insertController = async ({ body }: Request, res: Response) => {
        let invoice = await this.invoiceUseCase.registerInvoice(body);
        res.send({ invoice });
    }
}