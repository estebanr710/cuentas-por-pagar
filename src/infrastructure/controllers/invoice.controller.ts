import { Request, Response } from "express";
import { InvoiceUseCase } from "../../application/invoice.use.case"; 
import { matchedData } from "express-validator";
import { getPagination } from "../handlers/handle.pagination";

export class InvoiceController {

    constructor(private invoiceUseCase: InvoiceUseCase) {}

    public insertController = async (req: Request, res: Response) => {
        try {
            let { inv_title, inv_email_body, inv_senders_email } = matchedData(req);
            const INVOICE = await this.invoiceUseCase.registerInvoice({ inv_title, inv_email_body, inv_senders_email });
            res.status(201).send(INVOICE);
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public getController = async (req: Request, res: Response) => {
        try {
            let { page, size } = matchedData(req);
            let { limit, offset } = getPagination(page, size);
            let invoices = await this.invoiceUseCase.getInvoices({ page, size, limit, offset });
            res.send(invoices);
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public getByIdController = async (req: Request, res: Response) => {
        try {
            let { id } = matchedData(req);
            const INVOICE = await this.invoiceUseCase.getInvoice(id);
            if (INVOICE) {
                res.send(INVOICE);
            } else {
                res.status(404).send({ status: 404, message: "INVOICE_NOT_FOUND" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public addApproverController = async (req: Request, res: Response) => {
        try {
            let { id, approvers } = matchedData(req);
            const APPROVERS = await this.invoiceUseCase.addApprovers({ id, approvers });
            if (APPROVERS !== "APPROVERS_ADDED") {
                res.status(403).send({ status: 403, message: APPROVERS });
            } else {
                res.send({ status: 200, message: "APPROVERS_HAVE_BEEN_SUCCESSFULLY_ADDED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public addNoteController = async (req: Request, res: Response) => {
        try {
            let { invoice_id, user_id, not_description } = matchedData(req);
            const NOTE = await this.invoiceUseCase.addNote({ invoice_id, user_id, not_description });
            if (NOTE !== "NOTE_ADDED") {
                res.status(403).send({ status: 403, message: NOTE });
            } else {
                res.send({ status: 200, message: "NOTE_HAS_BEEN_SUCCESSFULLY_ADDED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }
}