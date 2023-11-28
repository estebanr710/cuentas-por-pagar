import { ProviderEntity } from "../../../domain/provider/provider.entity";
import { ProviderRepository } from "../../../domain/provider/provider.repository";
import { UpdateProvider } from "../../interfaces/main";

import Provider from "../../models/local.providers.schema";

export class MySqlProviderRepository implements ProviderRepository {

    async registerProvider(providerMock: any): Promise<any> {
        let { pro_nit, pro_email } = providerMock;
        if (await Provider.findOne({ where: { pro_nit } })) {
            if (pro_email) {
                if (await Provider.findOne({ where: { pro_email } })) {
                    return "PROVIDER_ALREADY_EXISTS";
                }
            } else {
                return "PROVIDER_ALREADY_EXISTS";
            }
        } else {
            const PROVIDER = await Provider.create(providerMock);
            return PROVIDER;
        }
    }
    
    async listProviders(): Promise<any> {
        const PROVIDERS = await Provider.findAll();
        return PROVIDERS;
    }

    async listProvider(id: string): Promise<any | null> {
        const PROVIDER = await Provider.findByPk(id);
        return PROVIDER;
    }
    
    async updateProvider({ id, pro_name, pro_email, pro_document_type, pro_bank, pro_account_number, pro_account_type, pro_state }: UpdateProvider): Promise<string | null> {
        let updateProvider = await Provider.update({ pro_name, pro_email, pro_document_type, pro_bank, pro_account_number, pro_account_type, pro_state }, { where: { id } });
        if (updateProvider) {
            return 'PROVIDER_UPDATED';
        } else {
            return null;
        }
    }

    public async findProviderByEmail(pro_email: string): Promise<any> {
        const PROVIDER = await Provider.findOne({ where: { pro_email } });
        return PROVIDER;
    }
}