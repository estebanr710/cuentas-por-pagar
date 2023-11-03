import { InvoiceRepository } from "../../../domain/invoice/invoice.repository";
import { MySqlProviderRepository } from "./provider.repository";
import Invoice from "../../models/local.invoices.schema";
import { FindInvoicesMock } from "../../interfaces/main";
import { getPagingData } from "../../handlers/handle.pagination";

import State from "../../models/local.states.schema";
import Provider from "../../models/local.providers.schema";
import User from "../../models/local.users.schema";
import Attachment from "../../models/local.attachments.schema";
import Note from "../../models/local.notes.schema";
import Role from "../../models/local.roles.schema";

export class MySqlInvoiceRepository implements InvoiceRepository {

    constructor (private mysqlProviderRepository = new MySqlProviderRepository) { }

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
}