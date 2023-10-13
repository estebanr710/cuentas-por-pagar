import { InvoiceRepository } from "../domain/invoice/invoice.repository"; 
import { InvoiceValue } from "../domain/invoice/invoice.value";
import { InvoiceEntity } from "../domain/invoice/invoice.entity";

export class InvoiceUseCase {

    constructor(private readonly invoiceRepository: InvoiceRepository) { }

    public registerInvoice = async ({ inv_title, provider_id, state_id, inv_cp_simi, inv_simi_state, inv_email_body, inv_senders_email, inv_amount, inv_modified_at, inv_modified_by, inv_managed_at, inv_managed_by }: InvoiceEntity) => {

        let invoiceValue = new InvoiceValue({
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
        });

        let invoiceCreated = await this.invoiceRepository.registerInvoice(invoiceValue);
        return invoiceCreated;
    }
}