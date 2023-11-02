import { ProviderEntity } from "../../../domain/provider/provider.entity";
import { ProviderRepository } from "../../../domain/provider/provider.repository";

import Provider from "../../models/local.providers.schema";

export class MySqlProviderRepository implements ProviderRepository {

    async registerProvider(providerMock: any): Promise<any> {
        const PROVIDER = await Provider.create(providerMock);
        return PROVIDER;
    }
    
    async listProviders(): Promise<any> {
        const PROVIDERS = await Provider.findAll();
        return PROVIDERS;
    }

    async listProvider(id: string): Promise<any | null> {
        const PROVIDER = await Provider.findByPk(id);
        return PROVIDER;
    }
    
    async updateProvider({ id, pro_name, pro_email, pro_state }: { id: string, pro_name: string | undefined, pro_email: string | undefined, pro_state: boolean | undefined }): Promise<string | null> {
        let updateProvider = await Provider.update({ pro_name, pro_email, pro_state }, { where: { id } });
        if (updateProvider) {
            return 'PROVIDER_UPDATED';
        } else {
            return null;
        }
    }
}