import { Request, Response } from "express";
import { matchedData } from "express-validator";


import { getPagination } from "../handlers/handle.pagination";
import now from "../handlers/handle.now";

import { NoteUseCase } from "../../application/note.use.case";
import { InvoiceUseCase } from "../../application/invoice.use.case"; 
import { ProviderUseCase } from "../../application/provider.use.case";

import { MySqlUserRepository } from "../repositories/mysql/user.repository";
import { MySqlInvoiceRepository } from "../repositories/mysql/invoice.repository";
import { MySqlProviderRepository } from "../repositories/mysql/provider.repository";
import { MySqlNoteRepository } from "../repositories/mysql/note.repository";

export class InvoiceController {

    constructor(
        private invoiceUseCase: InvoiceUseCase,
        //Note
        private noteRepository = new MySqlNoteRepository(),
        private noteUseCase = new NoteUseCase(noteRepository),
        
        private mysqlUserRepository = new MySqlUserRepository,
        private mysqlInvoiceRepository = new MySqlInvoiceRepository,
        
        private mysqlProviderRepository = new MySqlProviderRepository(),
        private providerUseCase = new ProviderUseCase(mysqlProviderRepository),
    ) {}

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
            let { id, user_id, approvers } = matchedData(req);
            const APPROVERS = await this.invoiceUseCase.addApprovers({
                id,
                user_id,
                approvers
            });
            if (APPROVERS !== "APPROVERS_ADDED") {
                res.status(403).send({ status: 403, message: APPROVERS });
            } else {
                /**
                 * Send notifications to approvers...
                 */
                res.send({ status: 200, message: "APPROVERS_HAVE_BEEN_SUCCESSFULLY_ADDED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public addCostCenterController = async (req: Request, res: Response) => {
        try {
            let { id, user_id, costcenter } = matchedData(req);
            const APPROVERS = await this.invoiceUseCase.addCostCenter({
                id,
                user_id,
                costcenter
            });
            if (APPROVERS !== "COST_CENTER_ADDED") {
                res.status(403).send({ status: 403, message: APPROVERS });
            } else {
                res.send({ status: 200, message: "COST_CENTER_HAVE_BEEN_SUCCESSFULLY_ADDED" });
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
    
    public aproveController = async (req: Request, res: Response) => {
        try {
            let { invoice_id, user_id, observation, inv_amount } = matchedData(req);
            const APPROVE = await this.invoiceUseCase.approveInvoice({ invoice_id, user_id, observation, inv_amount });
            if (APPROVE !== "INVOICE_APPROVED") {
                res.status(403).send({ status: 403, message: APPROVE });
            } else {
                res.send({ status: 200, message: "INVOICE_HAS_BEEN_SUCCESSFULLY_APPROVED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public rejectController = async (req: Request, res: Response) => {
        try {
            let { invoice_id, user_id, observation } = matchedData(req);
            const REJECT = await this.invoiceUseCase.rejectInvoice({ invoice_id, user_id, observation });
            if (REJECT !== "INVOICE_REJECTED") {
                res.status(403).send({ status: 403, message: REJECT });
            } else {
                res.send({ status: 200, message: "INVOICE_HAS_BEEN_SUCCESSFULLY_REJECTED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public returnController = async (req: Request, res: Response) => {
        try {
            let { invoice_id, user_id, observation } = matchedData(req);
            const RETURN = await this.invoiceUseCase.returnInvoice({ invoice_id, user_id, observation });
            if (RETURN !== "INVOICE_RETURNED") {
                res.status(403).send({ status: 403, message: RETURN });
            } else {
                res.send({ status: 200, message: "INVOICE_HAS_BEEN_SUCCESSFULLY_RETURNED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    public cancelController = async (req: Request, res: Response) => {
        try {
            let { invoice_id, user_id, observation } = matchedData(req);
            const CANCEL = await this.invoiceUseCase.cancelInvoice({ invoice_id, user_id, observation });
            if (CANCEL !== "INVOICE_CANCELED") {
                res.status(403).send({ status: 403, message: CANCEL });
            } else {
                res.send({ status: 200, message: "INVOICE_HAS_BEEN_SUCCESSFULLY_CANCELED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }
    
    public updateController = async (req: Request, res: Response) => {
        try {
            let {
                id,
                inv_title,
                provider_id,
                state_id,
                inv_cp_simi,
                inv_simi_state,
                inv_amount,
                user_id
            } = matchedData(req);
            if (!await this.mysqlInvoiceRepository.findInvoiceByUUID(id)) {
                return 'INVOICE_NOT_FOUND';
            }
            if (!await this.mysqlUserRepository.listUserByIdV2(user_id)) {
                return `USER_NOT_FOUND`;
            }
            if (
                !inv_title &&
                !provider_id &&
                !state_id &&
                !inv_cp_simi &&
                !inv_simi_state &&
                !inv_amount
            ) {
                res.status(403).send({ status: 403, message: 'NO_DATA' });
            } else {
                const INVOICE: any = await this.mysqlInvoiceRepository.findInvoiceByUUID(id);
                await this.invoiceUseCase.updateInvoice({
                    id,
                    inv_title,
                    provider_id,
                    state_id,
                    inv_cp_simi,
                    inv_simi_state,
                    inv_amount
                });
                const INVOICE_2: any = await this.mysqlInvoiceRepository.findInvoiceByUUID(id);
                // Edition fields values
                let fieldName: string = '__default__';
                let previousValue: any;
                let currentValue: any;
                if (inv_title) {
                    fieldName = 'ASUNTO';
                    previousValue = INVOICE.inv_title;
                    currentValue = inv_title;
                }
                if (provider_id) {
                    fieldName = 'PROVEEDOR';
                    previousValue = INVOICE.provider.pro_name ? INVOICE.provider.pro_name : '---';
                    currentValue = INVOICE_2.provider.pro_name;
                }
                if (inv_cp_simi) {
                    fieldName = 'CP SIMI';
                    previousValue = INVOICE.inv_cp_simi ? INVOICE.inv_cp_simi : '---';
                    currentValue = inv_cp_simi;
                }
                if (inv_simi_state) {
                    fieldName = 'ESTADO SIMI';
                    previousValue = INVOICE.inv_simi_state ? 'CONTABILIZADO' : 'NO CONTABILIZADO';
                    currentValue = inv_simi_state ? 'CONTABILIZADO' : 'NO CONTABILIZADO';
                }
                if (inv_amount) {
                    fieldName = 'VALOR';
                    previousValue = INVOICE.inv_amount ? INVOICE.inv_amount : '---';
                    currentValue = inv_amount;
                }
                // ./Edition fields values
                if (state_id) {
                    await this.noteUseCase.registerNote({
                        invoice_id: id,
                        user_id,
                        not_description: `Estado actualizado por: ${INVOICE_2.state.sta_description}`,
                        not_type: 'MANAGMENT'
                    });
                    await this.invoiceUseCase.updateInvoice({
                        id,
                        inv_managed_at: now(),
                        inv_managed_by: user_id,
                    });
                } else {
                    await this.noteUseCase.registerNote({
                        invoice_id: id,
                        user_id,
                        not_description: `El campo ${fieldName} ha sido actualizado:\r\nValor anterior: ${previousValue}\r\nValor actual: ${currentValue}`,
                        not_type: 'EDITION'
                    });
                    await this.invoiceUseCase.updateInvoice({
                        id,
                        inv_modified_at: now(),
                        inv_modified_by: user_id,
                    });
                }
                res.send({ status: 200, message: "INVOICE_HAS_BEEN_SUCCESSFULLY_UPDATED" });
            }
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }

    /* public sendToPagoTercerosController = async (req: Request, res: Response) => {
        try {

            let {  } = matchedData(req);


        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    } */
}