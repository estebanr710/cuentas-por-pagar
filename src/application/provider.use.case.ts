import { ProviderEntity } from "../domain/provider/provider.entity";
import { ProviderRepository } from "../domain/provider/provider.repository";
import { ProviderValue } from "../domain/provider/provider.value";
import { UpdateProvider } from "../infrastructure/interfaces/main";

export class ProviderUseCase {

    constructor(private readonly providerRepository: ProviderRepository) { }

    public registerProvider = async ({ pro_nit, pro_name, pro_email }: ProviderEntity) => {
        let providerValue = new ProviderValue({ pro_nit, pro_name, pro_email });
        let providerCreated = await this.providerRepository.registerProvider(providerValue);
        return providerCreated;
    }

    public getProviders = async () => {
        const PROVIDERS = await this.providerRepository.listProviders();
        return PROVIDERS;
    }

    public getProvider = async (id: string) => {
        const PROVIDER = await this.providerRepository.listProvider(id);
        return PROVIDER;
    }

    public updateProvider = async (provider: UpdateProvider) => {
        let { id, pro_name, pro_email, pro_document_type, pro_bank, pro_account_number, pro_account_type, pro_state } = provider;
        let updateProvider = await this.providerRepository.updateProvider({ id, pro_name, pro_email, pro_document_type, pro_bank, pro_account_number, pro_account_type, pro_state });
        return updateProvider;
    }
}