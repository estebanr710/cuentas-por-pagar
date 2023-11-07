import { InvoiceRepository } from "../../../domain/invoice/invoice.repository";

import { MySqlProviderRepository } from "./provider.repository";
import { MySqlUserRepository } from "./user.repository";
import { MySqlNoteRepository } from "./note.repository";
import { MySqlApproverRepository } from "./approver.repository";

import { FindInvoicesMock } from "../../interfaces/main";
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

    async updateInvoice(invoice: any): Promise<any> {
        return null;
    }

    async addApprovers({ id, approvers }: { id: string, approvers: string[] }): Promise<any> {
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
            })
        }
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
}