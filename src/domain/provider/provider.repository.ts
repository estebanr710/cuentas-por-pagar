import { ProviderEntity } from "./provider.entity";

export interface ProviderRepository {
    registerProvider(provider: ProviderEntity): Promise<ProviderEntity | null | string>;
    listProviders(): Promise<ProviderEntity[] | null>;
    listProvider(id: string): Promise<ProviderEntity | null>;
    updateProvider(provider: { id: string, pro_name: string | undefined, pro_nit: string | undefined, pro_email: string | undefined, pro_state: boolean | undefined }): Promise<string | null>;
}