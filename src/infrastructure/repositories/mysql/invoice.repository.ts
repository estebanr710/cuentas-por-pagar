import { InvoiceRepository } from "../../../domain/invoice/invoice.repository";

import { MySqlProviderRepository } from "./provider.repository";
import { MySqlUserRepository } from "./user.repository";
import { MySqlNoteRepository } from "./note.repository";
import { MySqlApproverRepository } from "./approver.repository";

import { AddApprovers, CustomInvoice, FindInvoicesMock } from "../../interfaces/main";
import { getPagingData } from "../../handlers/handle.pagination";

import Invoice from "../../models/local.invoices.schema";
import State from "../../models/local.states.schema";
import Provider from "../../models/local.providers.schema";
import User from "../../models/local.users.schema";
import Attachment from "../../models/local.attachments.schema";
import Note from "../../models/local.notes.schema";
import Role from "../../models/local.roles.schema";
import Approver from "../../models/local.approvers.schema";

import { ApproverUseCase } from "../../../application/approver.use.case";
import { NoteUseCase } from "../../../application/note.use.case";

import { NoteEntity } from "../../../domain/note/note.entity";
import { ApproverEntity } from "../../../domain/approver/approver.entity";
import now from "../../handlers/handle.now";

const APPROVED_STATE: string = process.env.APPROVED_STATE_ID ?? '__defalult__';
const REJECTED_STATE: string = process.env.REJECTED_STATE_ID ?? '__defalult__';
const IN_PROCESS_STATE: string = process.env.IN_PROCESS_STATE_ID ?? '__defalult__';

const ADMIN_ROLE: string = process.env.ADMIN_ROLE_ID ?? '__defalult__';

export class MySqlInvoiceRepository implements InvoiceRepository {

    constructor (
        //Approver
        private approverRepository = new MySqlApproverRepository(),
        private approverUseCase = new ApproverUseCase(approverRepository),
        //Note
        private noteRepository = new MySqlNoteRepository(),
        private noteUseCase = new NoteUseCase(noteRepository),

        private mysqlProviderRepository = new MySqlProviderRepository,
        private mysqlUserRepository = new MySqlUserRepository
    ) { }

    async findInvoiceById(id: string): Promise<any> {
        const INVOICE = await Invoice.findOne({
            attributes: {
                exclude: [
                    "state_id",
                    "provider_id",
                    "inv_modified_by",
                    "inv_managed_by"
                ] 
            },
            include: [
                {
                    model: State
                },
                {
                    model: Provider
                },
                {
                    model: User,
                    as: "modifier",
                    include: [
                        {
                            model: Role
                        }
                    ],
                    attributes: {
                        exclude: [
                            "role_id",
                            "use_microsoft_id"
                        ]
                    }
                },
                {
                    model: User,
                    as: "manager",
                    include: [
                        {
                            model: Role
                        }
                    ],
                    attributes: {
                        exclude: [
                            "role_id",
                            "use_microsoft_id"
                        ]
                    }
                },
                {
                    model: Attachment,
                    attributes: {
                        exclude: [
                            "invoice_id",
                            "att_relative_path"
                        ]
                    }
                },
                {
                    model: Note,
                    include: [
                        {
                            model: User,
                            attributes: [
                                "id",
                                "use_name"
                            ]
                        }
                    ],
                    attributes: {
                        exclude: [
                            "invoice_id",
                            "user_id"
                        ]
                    }
                },
                {
                    model: Approver,
                    include: [
                        {
                            model: User,
                            attributes: [
                                "id",
                                "use_name"
                            ]
                        }
                    ],
                    attributes: {
                        exclude: [
                            "id",
                            "invoice_id",
                            "user_id"
                        ]
                    }
                }
            ],
            where: { id }
        });
        return INVOICE;
    }
    
    async registerInvoice(invoiceMock: any): Promise<any> {
        let { inv_senders_email } = invoiceMock;
        const PROVIDER = await this.mysqlProviderRepository.findProviderByEmail(inv_senders_email);
        if (PROVIDER !== null) {
            invoiceMock.provider_id = PROVIDER.id;
        }
        const INVOICE = await Invoice.create(invoiceMock);
        return INVOICE;
    }
    
    async listInvoices(findMock: FindInvoicesMock): Promise<any> {
        let { page, size, limit, offset } = findMock;
        let data = await Invoice.findAndCountAll({
            limit,
            offset,
            attributes: {
                exclude: [
                    "state_id",
                    "provider_id",
                    "inv_email_body",
                    "inv_modified_by",
                    "inv_managed_by"
                ] 
            },
            include: [
                {
                    model: State
                },
                {
                    model: Provider
                },
                {
                    model: User,
                    as: "modifier",
                    attributes: [
                        "id",
                        "use_name"
                    ]
                },
                {
                    model: User,
                    as: "manager",
                    attributes: [
                        "id",
                        "use_name"
                    ]
                }
            ],
            order: [
                ["inv_reference", "ASC"]
            ]
        });
        const INVOICES = getPagingData(data, page, limit);
        return INVOICES;
    }

    async updateInvoice(invoice: CustomInvoice): Promise<any> {
        let { id } = invoice;
        const INVOICE_UPDATED = await Invoice.update(invoice, { where: { id } });
        return INVOICE_UPDATED;
    }

    async addApprovers({ id, user_id, approvers }: AddApprovers): Promise<any> {
        if (!await this.findInvoiceById(id)) {
            return 'INVOICE_NOT_FOUND';
        }
        for (const e of approvers) {    
            if (!await this.mysqlUserRepository.listUserByIdV2(e)) {
                return `USER_WITH_ID_${e}_NOT_FOUND`;
            }
            await this.approverUseCase.registerApprover({
                user_id: e,
                invoice_id: id
            });
        }
        // Change invoice's state to 'IN PROCESS'
        await this.updateInvoice({
            id,
            inv_managed_at: now(),
            inv_managed_by: user_id,
            state_id: IN_PROCESS_STATE
        });
        // Add note
        await this.noteUseCase.registerNote({
            invoice_id: id,
            user_id,
            not_description: 'Factura asignada',
            not_type: 'MANAGMENT'
        });
        return "APPROVERS_ADDED";
    }

    async addNote(note: NoteEntity): Promise<any> {
        let { invoice_id, user_id } = note;
        if (!await this.findInvoiceById(invoice_id)) {
            return 'INVOICE_NOT_FOUND';
        }
        if (!await this.mysqlUserRepository.listUserByIdV2(user_id)) {
            return `USER_NOT_FOUND`;
        }
        await this.noteUseCase.registerNote(note);
        return "NOTE_ADDED";
    }

    async approveInvoice(approver: ApproverEntity): Promise<any> {
        let { user_id, invoice_id } = approver;
        if (!await this.findInvoiceById(invoice_id)) {
            return 'INVOICE_NOT_FOUND';
        }
        const USER = await this.mysqlUserRepository.listUserByIdV2(user_id);
        if (!USER) {
            return 'USER_NOT_FOUND';
        }
        // Get all the approvers of the invoice
        const COUNT_APPROVERS = await this.approverUseCase.getByInvoice(invoice_id);
        // Get the current invoice approver
        const APPROVER = await this.approverRepository.getApprover({
            user_id,
            invoice_id
        });
        // If the current user is admin
        if (USER.role.id === ADMIN_ROLE) {
            // If invoice doesn't have approvers
            if (!COUNT_APPROVERS) {
                // Update 'managed' fields [timestamps and managed by] on invoice record
                await this.updateInvoice({
                    id: invoice_id,
                    inv_managed_at: now(),
                    inv_managed_by: user_id,
                    state_id: APPROVED_STATE
                });
            } else {
                // If the admin user is approver of the invoice
                if (APPROVER) {
                    // Update approver
                    await this.approverUseCase.updateApprover({
                        user_id,
                        invoice_id,
                        app_state: true
                    });
                    const TOTAL: number = COUNT_APPROVERS.count;
                    let count: number = 0;
                    for (const e of COUNT_APPROVERS.rows) {
                        if (e.app_state === true) {
                            count++;
                        }
                    }
                    // If all the approvers of the invoice have approved the invoice
                    if (TOTAL === count) {
                        // Change the invoice's state to 'APPROVED'
                        await this.updateInvoice({
                            id: invoice_id,
                            state_id: APPROVED_STATE
                        });
                    }
                } else { 
                    return "NO_MESAGGE";
                }
            }
        } else {
            // If invoice doesn't have approvers
            if (!COUNT_APPROVERS) {
                return "INVOICE_DOES_NOT_HAVE_APPROVERS";
            }
            // If the user isn't the approver of the invoice
            if (!APPROVER) {
                return 'USER_IS_NOT_APPROVER_OF_THIS_INVOICE';
            }
            // Update approver
            await this.approverUseCase.updateApprover({
                user_id,
                invoice_id,
                app_state: true
            });
            // Update 'managed' fields [timestamps and managed by] on invoice record
            await this.updateInvoice({
                id: invoice_id,
                inv_managed_at: now(),
                inv_managed_by: user_id
            });
            const TOTAL: number = COUNT_APPROVERS.count;
            let count: number = 0;
            for (const e of COUNT_APPROVERS.rows) {
                if (e.app_state === true) {
                    count++;
                }
            }
            // If all the approvers of the invoice have approved the invoice
            if (TOTAL === count) {
                // Change the invoice's state to 'APPROVED'
                await this.updateInvoice({
                    id: invoice_id,
                    state_id: APPROVED_STATE
                });
            }
        }
        // Add note
        await this.noteUseCase.registerNote({
            invoice_id,
            user_id,
            not_description: 'Factura aprobada',
            not_type: 'MANAGMENT'
        });
        return "INVOICE_APPROVED";
    }

    async rejectInvoice(approver: ApproverEntity): Promise<any> {
        let { user_id, invoice_id } = approver;
        if (!await this.findInvoiceById(invoice_id)) {
            return 'INVOICE_NOT_FOUND';
        }
        const USER = await this.mysqlUserRepository.listUserByIdV2(user_id);
        if (!USER) {
            return 'USER_NOT_FOUND';
        }
        if (USER.role.id !== ADMIN_ROLE) {
            const APPROVER = await this.approverRepository.getApprover({
                user_id,
                invoice_id
            });
            if (!APPROVER) {
                return 'USER_IS_NOT_APPROVER_OF_THIS_INVOICE';
            }
            // Proccess invoice
            const COUNT_APPROVERS = await this.approverUseCase.getByInvoice(invoice_id);
            if (!COUNT_APPROVERS) {
                return "INVOICE_DOES_NOT_HAVE_APPROVERS";
            }
        }
        await this.updateInvoice({
            id: invoice_id,
            inv_managed_at: now(),
            inv_managed_by: user_id,
            state_id: REJECTED_STATE
        });
        await this.noteUseCase.registerNote({
            invoice_id,
            user_id,
            not_description: 'Factura rechazada',
            not_type: 'MANAGMENT'
        });
        return "INVOICE_REJECTED";
    }
}