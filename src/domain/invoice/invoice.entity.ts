export interface InvoiceEntity {
    id?: string,
    inv_reference?: string | undefined,
    inv_title: string | null,
    provider_id: string | null,
    state_id: string,
    inv_cp_simi: string | null,
    inv_simi_state: boolean,
    inv_email_body: string,
    inv_senders_email: string,
    inv_amount: number | null,
    inv_created_at?: Date,
    inv_modified_at: Date | null | undefined;
    inv_modified_by: string | null | undefined;
    inv_managed_at: Date | null | undefined;
    inv_managed_by: string | null | undefined;
}