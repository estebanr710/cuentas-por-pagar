import { InvoiceRepository } from "../domain/invoice/invoice.repository"; 
import { InvoiceValue } from "../domain/invoice/invoice.value";
import { InvoiceEntity } from "../domain/invoice/invoice.entity";

export class InvoiceUseCase {

    constructor(private readonly invoiceRepository: InvoiceRepository) { }

    public registerInvoice = async ({ inv_title, provider_id, inv_email_body, inv_senders_email }: InvoiceEntity) => {

        let invoiceValue = new InvoiceValue({
            inv_title,
            provider_id,
            inv_email_body,
            inv_senders_email
        });

        let invoiceCreated = await this.invoiceRepository.registerInvoice(invoiceValue);
        return invoiceCreated;
    }
}