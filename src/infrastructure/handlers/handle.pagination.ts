import { InvoicesPaginated } from "../interfaces/main";

const getPagination = (page: number, size: number): { limit: number, offset: number } => {
    page = page - 1;
    let limit: number = size ? +size : 3;
    let offset: number = page ? page * limit : 0;
    return { limit, offset };
}

const getPagingData = (data: any, page: number, limit: number): InvoicesPaginated => {
    let { count: totalItems, rows: invoices } = data;
    let firstPage = 1;
    let lastPage = Math.ceil(totalItems / limit);
    let currentPage = page ? +page : 0;
    let totalPages = Math.ceil(totalItems / limit);
    let nextPage = currentPage === totalPages ? null : currentPage + 1;
    let previousPage = firstPage === currentPage ? null : currentPage - 1;
    return { invoices, totalItems, totalPages, firstPage, lastPage, previousPage, currentPage, nextPage };
}

export { getPagination, getPagingData }