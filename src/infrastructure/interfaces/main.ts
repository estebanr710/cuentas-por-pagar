import Invoice from "../models/local.invoices.schema";

export interface InvoicesPaginated {
    invoices: Invoice[],
    totalItems: number,
    totalPages: number,
    firstPage: number,
    lastPage: number,
    previousPage: number | null,
    currentPage: number,
    nextPage: number | null
}

export interface FindInvoicesMock {
    page: number,
    size: number,
    limit: number,
    offset: number
}

export interface Pagination {
    limit: number,
    offset: number 
}