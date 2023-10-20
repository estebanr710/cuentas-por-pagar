import { InvoiceEntity } from "./invoice.entity";
import { v4 as uuid  } from "uuid";
import now from "../../infrastructure/handlers/handle.now";

export class InvoiceValue implements InvoiceEntity {
    
    id: string;
    inv_reference: string | undefined;
    inv_title: string | null;
    provider_id: string | null;
    state_id: string;
    inv_cp_simi: string | null;
    inv_simi_state: boolean;
    inv_email_body: string;
    inv_senders_email: string;
    inv_amount: number | null;
    inv_created_at: Date;
    inv_modified_at: Date | null | undefined;
    inv_modified_by: string | null | undefined;
    inv_managed_at: Date | null | undefined;
    inv_managed_by: string | null | undefined;

    constructor(
        {
            inv_title,
            provider_id,
            state_id,
            inv_cp_simi,
            inv_simi_state,
            inv_email_body,
            inv_senders_email,
            inv_amount,
            inv_modified_at,
            inv_modified_by,
            inv_managed_at,
            inv_managed_by
        }: InvoiceEntity
    ) {
        this.id = uuid();
        this.inv_title = inv_title ?? null;
        this.provider_id = provider_id ?? null;
        this.state_id = state_id;
        this.inv_cp_simi = inv_cp_simi ?? null;
        this.inv_simi_state = inv_simi_state;
        this.inv_email_body = inv_email_body;
        this.inv_senders_email = inv_senders_email;
        this.inv_amount = inv_amount ?? null;
        this.inv_created_at = now();
        this.inv_modified_at = inv_modified_at ?? null;
        this.inv_modified_by = inv_modified_by ?? null;
        this.inv_managed_at = inv_managed_at ?? null;
        this.inv_managed_by = inv_managed_by ?? null;
    }
}