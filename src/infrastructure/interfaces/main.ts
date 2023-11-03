import Invoice from "../models/local.invoices.schema";

export interface InvoicesPaginated {
    invoices: Invoice[],
    totalItems: number,
    totalPages: number,
    firstPage: number,
    lastPage: number,
    previousPage: number,
    currentPage: number,
    nextPage: number
}

export interface FindInvoicesMock {
    page: number,
    size: number,
    limit: number,
    offset: number
}