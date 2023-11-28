export interface ProviderEntity {
    id?: string,
    pro_nit: string,
    pro_name: string,
    pro_email?: string | null,
    pro_document_type?: number | null,
    pro_bank?: number | null,
    pro_account_number?: string | null,
    pro_account_type?: 'AHORROS' | 'CORRIENTE' | null,
    pro_state?: boolean,
}