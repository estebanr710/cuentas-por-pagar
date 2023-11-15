import { InvoiceRepository } from "../../../domain/invoice/invoice.repository";

import { MySqlProviderRepository } from "./provider.repository";
import { MySqlUserRepository } from "./user.repository";
import { MySqlNoteRepository } from "./note.repository";
import { MySqlApproverRepository } from "./approver.repository";
import { MySqlIxCCRepository } from "./ixcc.repository";

import { AddApprovers, AddCostCenter, ApproverActions, CustomInvoice, FindInvoicesMock } from "../../interfaces/main";
import { getPagingData } from "../../handlers/handle.pagination";
import now from "../../handlers/handle.now";

import Invoice from "../../models/local.invoices.schema";
import State from "../../models/local.states.schema";
import Provider from "../../models/local.providers.schema";
import User from "../../models/local.users.schema";
import Attachment from "../../models/local.attachments.schema";
import Note from "../../models/local.notes.schema";
import Role from "../../models/local.roles.schema";
import Approver from "../../models/local.approvers.schema";
import IxCC from "../../models/local.ixcc.schema";
import CostCenter from "../../models/local.costcenter.schema";

import { ApproverUseCase } from "../../../application/approver.use.case";
import { NoteUseCase } from "../../../application/note.use.case";
import { IxCCUseCase } from "../../../application/ixcc.use.case";

import { NoteEntity } from "../../../domain/note/note.entity";
import { MySqlCostCenterRepository } from "./costcenter.repository";

const APPROVED_STATE: string = process.env.APPROVED_STATE_ID ?? '__defalult__';
const REJECTED_STATE: string = process.env.REJECTED_STATE_ID ?? '__defalult__';
const IN_PROCESS_STATE: string = process.env.IN_PROCESS_STATE_ID ?? '__defalult__';
const RETURNED_STATE: string = process.env.RETURNED_STATE_ID ?? '__defalult__';
const CANCELED_STATE: string = process.env.CANCELLED_STATE_ID ?? '__defalult__';

const ADMIN_ROLE: string = process.env.ADMIN_ROLE_ID ?? '__defalult__';

export class MySqlInvoiceRepository implements InvoiceRepository {

    constructor (
        //IxCC
        private ixccRepository = new MySqlIxCCRepository(),
        private ixccUseCase = new IxCCUseCase(ixccRepository),
        //Approver
        private approverRepository = new MySqlApproverRepository(),
        private approverUseCase = new ApproverUseCase(approverRepository),
        //Note
        private noteRepository = new MySqlNoteRepository(),
        private noteUseCase = new NoteUseCase(noteRepository),

        private mysqlProviderRepository = new MySqlProviderRepository,
        private mysqlUserRepository = new MySqlUserRepository,
        private mysqlCostCenterRepository = new MySqlCostCenterRepository
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
                },
                {
                    model: IxCC,
                    include: [
                        {
                            model: CostCenter,
                            attributes: [
                                "id",
                                "cos_cen_description"
                            ]
                        }
                    ],
                    attributes: {
                        exclude: [
                            "id",
                            "invoice_id",
                            "costcenter_id"
                        ]
                    }
                }
            ],
            where: { inv_reference: id }
        });
        return INVOICE;
    }
    
    async registerInvoice(invoiceMock: any): Promise<any> {
        let { inv_senders_email } = invoiceMock;
        const PROVIDER = await this.mysqlProviderRepository.findProviderByEmail(inv_senders_email);
        if (PROVIDER !== null) {
            invoiceMock.provider_id = PROVIDER.id;
        }
        const CREATE: any = await Invoice.create(invoiceMock);
        const INVOICE = await Invoice.findByPk(CREATE.id, {
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
            ]
        });
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

    async approveInvoice(approver: ApproverActions): Promise<any> {
        let { user_id, invoice_id, observation, inv_amount } = approver;
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
                    state_id: APPROVED_STATE,
                    inv_amount
                });
            } else {
                // If the admin user is approver of the invoice
                if (APPROVER) {
                    // Update 'managed' fields [timestamps and managed by] on invoice record
                    await this.updateInvoice({
                        id: invoice_id,
                        inv_managed_at: now(),
                        inv_managed_by: user_id,
                        inv_amount
                    });
                    // Update approver
                    await this.approverUseCase.updateApprover({
                        user_id,
                        invoice_id,
                        app_state: true
                    });
                    // Get all the approvers of the invoice
                    const COUNT_APPROVERS_3 = await this.approverUseCase.getByInvoice(invoice_id);
                    const TOTAL: number = COUNT_APPROVERS_3.count;
                    let count: number = 0;
                    for (const e of COUNT_APPROVERS_3.rows) {
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
                inv_managed_by: user_id,
                inv_amount
            });
            // Get all the approvers of the invoice
            const COUNT_APPROVERS_2 = await this.approverUseCase.getByInvoice(invoice_id);
            const TOTAL: number = COUNT_APPROVERS_2.count;
            let count: number = 0;
            for (const e of COUNT_APPROVERS_2.rows) {
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
            not_description: `Factura aprobada:\r\n${observation}`,
            not_type: 'MANAGMENT'
        });
        return "INVOICE_APPROVED";
    }

    async rejectInvoice(approver: ApproverActions): Promise<any> {
        let { user_id, invoice_id, observation } = approver;
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
            not_description: `Factura rechazada:\r\n${observation}`,
            not_type: 'MANAGMENT'
        });
        return "INVOICE_REJECTED";
    }

    async returnInvoice(approver: ApproverActions): Promise<any> {
        let { user_id, invoice_id, observation } = approver;
        if (!await this.findInvoiceById(invoice_id)) {
            return 'INVOICE_NOT_FOUND';
        }
        if (!await this.mysqlUserRepository.listUserByIdV2(user_id)) {
            return 'USER_NOT_FOUND';
        }
        // Proccess invoice
        const COUNT_APPROVERS = await this.approverUseCase.getByInvoice(invoice_id);
        if (!COUNT_APPROVERS) {
            return "INVOICE_DOES_NOT_HAVE_APPROVERS";
        }
        const APPROVER = await this.approverRepository.getApprover({
            user_id,
            invoice_id
        });
        if (!APPROVER) {
            return 'USER_IS_NOT_APPROVER_OF_THIS_INVOICE';
        }
        await this.approverUseCase.deleteApprover(APPROVER.id);
        await this.updateInvoice({
            id: invoice_id,
            inv_managed_at: now(),
            inv_managed_by: user_id
        });
        await this.noteUseCase.registerNote({
            invoice_id,
            user_id,
            not_description: `Factura retornada:\r\n${observation}`,
            not_type: 'MANAGMENT'
        });
        // Get approvers by second time
        const COUNT_APPROVERS_2 = await this.approverUseCase.getByInvoice(invoice_id);
        if (COUNT_APPROVERS_2.count === 0) {
            await this.updateInvoice({
                id: invoice_id,
                state_id: RETURNED_STATE
            });
        }
        return "INVOICE_RETURNED";
    }

    async cancelInvoice(approver: ApproverActions): Promise<any> {
        let { user_id, invoice_id, observation } = approver;
        if (!await this.findInvoiceById(invoice_id)) {
            return 'INVOICE_NOT_FOUND';
        }
        const USER = await this.mysqlUserRepository.listUserByIdV2(user_id);
        if (!USER) {
            return 'USER_NOT_FOUND';
        }
        if (USER.role.id !== ADMIN_ROLE) {
            return "USER_IS_NOT_ADMIN";
        } else {
            await this.updateInvoice({
                id: invoice_id,
                inv_managed_at: now(),
                inv_managed_by: user_id,
                state_id: CANCELED_STATE
            });
            await this.noteUseCase.registerNote({
                invoice_id,
                user_id,
                not_description: `Factura anulada:\r\n${observation}`,
                not_type: 'MANAGMENT'
            });
            return "INVOICE_CANCELED";
        }
    }

    async addCostCenter({ id, user_id, costcenter }: AddCostCenter): Promise<any> {
        if (!await this.findInvoiceById(id)) {
            return 'INVOICE_NOT_FOUND';
        }
        let percentage = 0;
        for (const e of costcenter) {    
            if (!await this.mysqlCostCenterRepository.listCostCenterById(e.costcenter_id)) {
                return `COST_CENTER_WITH_ID_${e.costcenter_id}_NOT_FOUND`;
            }
            percentage += e.percentage;
        }
        percentage = Math.round(percentage);
        if (percentage !== 100) {
            return `TOTAL_PERCENTAGE_IS_NOT_EQUAL_TO_100`;
        }
        for (const e of costcenter) {
            await this.ixccUseCase.registerIxCC({
                invoice_id: id,
                costcenter_id: e.costcenter_id,
                percentage: e.percentage
            });
        }
        // Add note
        await this.noteUseCase.registerNote({
            invoice_id: id,
            user_id,
            not_description: 'Centros de costos añadidos',
            not_type: 'EDITION'
        });
        return "COST_CENTER_ADDED";
    }
}