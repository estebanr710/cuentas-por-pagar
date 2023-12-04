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
import axios from "axios";

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
                !inv_amount
            ) {
                res.status(403).send({ status: 403, message: 'NO_DATA' });
            } else {
                const INVOICE: any = await this.mysqlInvoiceRepository.findInvoiceByUUID(id);
                let simiState = false;
                if (inv_cp_simi) {
                    simiState = true;
                }
                await this.invoiceUseCase.updateInvoice({
                    id,
                    inv_title,
                    provider_id,
                    state_id,
                    inv_cp_simi,
                    inv_simi_state: simiState,
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
                    previousValue = INVOICE.provider !== null ? INVOICE.provider.pro_name : '---';
                    currentValue = INVOICE_2.provider.pro_name;
                }
                if (inv_cp_simi) {
                    fieldName = 'CP SIMI';
                    previousValue = INVOICE.inv_cp_simi ? INVOICE.inv_cp_simi : '---';
                    currentValue = inv_cp_simi;
                    if (simiState) {
                        await this.noteUseCase.registerNote({
                            invoice_id: id,
                            user_id,
                            not_description: `El campo ESTADO SIMI ha sido actualizado:\r\nValor anterior: ${INVOICE.inv_simi_state ? 'CONTABILIZADO' : 'NO CONTABILIZADO'}\r\nValor actual: CONTABILIZADO`,
                            not_type: 'EDITION'
                        });
                    }
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

    public sendToPagoTercerosController = async (req: Request, res: Response) => {
        try {

            let {
                id,
                user_id,
                provider_id,
                category_id,
                pay_description,
                pay_lis_payment_amount,
                invoice_due_date,
                pay_lis_holder_immovable,
                pay_lis_origin_money_nit,
                pay_lis_ledger_account
            } = matchedData(req);
            const VALIDATE_INVOICE = await this.mysqlInvoiceRepository.findInvoiceByUUID(id);
            if (!VALIDATE_INVOICE) {
                return 'INVOICE_NOT_FOUND';
            }
            if (!await this.mysqlUserRepository.listUserByIdV2(user_id)) {
                return `USER_NOT_FOUND`;
            }
            const PROVIDER = await this.providerUseCase.getProvider(provider_id);
            if (!PROVIDER) {
                return `PROVIDER_NOT_FOUND`;
            }
            const INVOICE = await this.mysqlInvoiceRepository.findInvoiceById(VALIDATE_INVOICE.inv_reference);

            let text = '';
            for (const e of INVOICE.approvers) {
                if (e.app_state === true) {
                    text += `${e.user.use_name}, `;
                }
            }
            text = text.trim().slice(0, -1);

            const DATA: any = {
                pay_description: pay_description,
                category_id,
                pay_lis_holder_name: PROVIDER.pro_name,
                pay_lis_holder_mail: PROVIDER.pro_email,
                pay_lis_holder_document_number: PROVIDER.pro_nit,
                document_type_id: PROVIDER.pro_document_type,
                bank_id: PROVIDER.pro_bank,
                pay_lis_account_number: Number(PROVIDER.pro_account_number),
                pay_lis_account_type: PROVIDER.pro_account_type,
                pay_lis_payment_amount: Number(pay_lis_payment_amount),
                invoice_due_date: invoice_due_date ?? null,
                text: text.length > 0 ? text : '---',
                pay_lis_holder_immovable: pay_lis_holder_immovable ?? null,
                pay_lis_origin_money_nit: pay_lis_origin_money_nit ?? null,
                pay_lis_ledger_account: pay_lis_ledger_account ?? null
            }
            
            // Send to pago-terceros

            const CREATE_PAYMENT_ENDPOINT = process.env.CREATE_PAYMENT_ENDPOINT ?? '__default__';

            const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT ?? '__default__';
            const X_API_KEY = process.env.X_API_KEY ?? '__default__';
            const AUTH_USER = process.env.AUTH_USER ?? '__default__';
            const AUTH_PASSWORD = process.env.AUTH_PASSWORD ?? '__default__';

            const AUTH = await axios.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: AUTH_ENDPOINT,
                headers: { 
                    'xapikey': X_API_KEY, 
                    'Content-Type': 'application/json'
                },
                data: {
                    email: AUTH_USER,
                    password: AUTH_PASSWORD
                }
            });

            const TOKEN: string = AUTH.data.data.token;

            await axios.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: CREATE_PAYMENT_ENDPOINT,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                data: DATA
            });

            await this.invoiceUseCase.updateInvoice({
                id,
                state_id: process.env.APPROBED_FOR_PAYMENT_STATE_ID ?? '__default__',
                inv_managed_at: now(),
                inv_managed_by: user_id,
            });

            await this.noteUseCase.registerNote({
                invoice_id: id,
                user_id,
                not_description: `Estado actualizado por: APROBADA PARA PAGO`,
                not_type: 'MANAGMENT'
            });

            res.send({ status: 200, message: "INVOICE_HAS_BEEN_SENT_TO_PAGO_TERCEROS" });
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }
}