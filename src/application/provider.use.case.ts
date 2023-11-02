import { ProviderEntity } from "../domain/provider/provider.entity";
import { ProviderRepository } from "../domain/provider/provider.repository";
import { ProviderValue } from "../domain/provider/provider.value";

export class ProviderUseCase {

    constructor(private readonly providerRepository: ProviderRepository) { }

    public registerProvider = async ({ pro_name, pro_email }: ProviderEntity) => {
        let providerValue = new ProviderValue({ pro_name, pro_email });
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

    public updateProvider = async (provider: { id: string, pro_name: string | undefined, pro_email: string | undefined, pro_state: boolean | undefined }) => {
        let { id, pro_name, pro_email, pro_state } = provider;
        let updateProvider = await this.providerRepository.updateProvider({ id, pro_name, pro_email, pro_state });
        return updateProvider;
    }
}