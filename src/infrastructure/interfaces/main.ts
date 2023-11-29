import { ApproverEntity } from "../../domain/approver/approver.entity";
import Invoice from "../models/local.invoices.schema";

export interface InvoicesPaginated {
    invoices: Invoice[];
    totalItems: number;
    totalPages: number;
    firstPage: number;
    lastPage: number;
    previousPage: number | null;
    currentPage: number;
    nextPage: number | null;
}

export interface FindInvoicesMock {
    page: number;
    size: number;
    limit: number;
    offset: number;
}

export interface Pagination {
    limit: number;
    offset: number;
}

export interface CustomInvoice {
    id: string,
    inv_reference?: number,
    inv_title?: string,
    provider_id?: string | null,
    state_id?: string,
    inv_cp_simi?: string | null,
    inv_simi_state?: boolean,
    inv_email_body?: string,
    inv_senders_email?: string,
    inv_amount?: number | null,
    inv_created_at?: Date,
    inv_modified_at?: Date | null;
    inv_modified_by?: string | null;
    inv_managed_at?: Date | null;
    inv_managed_by?: string | null;
}

export interface AddApprovers {
    id: string;
    user_id: string;
    approvers: string[];
}

export interface CustomCostCenter {
    costcenter_id: string;
    percentage: number;
}

export interface AddCostCenter {
    id: string;
    user_id: string;
    costcenter: CustomCostCenter[];
}

export interface ApproverActions extends ApproverEntity {
    observation: string;
    inv_amount?: number;
}

export interface UpdateProvider {
    id: string;
    pro_name?: string | null;
    pro_email?: string | null;
    pro_document_type?: number | null;
    pro_bank?: number | null;
    pro_account_number?: string | null;
    pro_account_type?: 'AHORROS' | 'CORRIENTE' | null;
    pro_state?: boolean | null;
}

export interface SendMailData {
    to: string;
    subject: string;
    template: string;
}