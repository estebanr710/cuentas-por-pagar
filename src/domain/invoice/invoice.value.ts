import { InvoiceEntity } from "./invoice.entity";
import { v4 as uuid  } from "uuid";
import now from "../../infrastructure/handlers/handle.now";

const NEW_STATE_ID: string = process.env.NEW_STATE_ID ?? 'de966081-92b7-4700-831d-e8324c00ee75';

export class InvoiceValue implements InvoiceEntity {
    
    id: string;
    inv_title: string;
    provider_id: string | null;
    state_id: string;
    inv_cp_simi: null;
    inv_simi_state: boolean;
    inv_email_body: string;
    inv_senders_email: string;
    inv_amount: null;
    inv_created_at: Date;
    inv_modified_at: null;
    inv_modified_by: null;
    inv_managed_at: null;
    inv_managed_by: null;

    constructor(
        {
            inv_title,
            provider_id,
            inv_email_body,
            inv_senders_email
        }: InvoiceEntity
    ) {
        this.id = uuid();
        this.inv_title = inv_title;
        this.provider_id = provider_id ?? null;
        this.state_id = NEW_STATE_ID;
        this.inv_cp_simi = null;
        this.inv_simi_state = false;
        this.inv_email_body = inv_email_body;
        this.inv_senders_email = inv_senders_email;
        this.inv_amount = null;
        this.inv_created_at = now();
        this.inv_modified_at = null;
        this.inv_modified_by = null;
        this.inv_managed_at = null;
        this.inv_managed_by = null;
    }
}