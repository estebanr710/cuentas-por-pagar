import { UpdateProvider } from "../../infrastructure/interfaces/main";
import { ProviderEntity } from "./provider.entity";

export interface ProviderRepository {
    registerProvider(provider: ProviderEntity): Promise<ProviderEntity | null | string>;
    listProviders(): Promise<ProviderEntity[] | null>;
    listProvider(id: string): Promise<ProviderEntity | null>;
    updateProvider(provider: UpdateProvider): Promise<string | null>;
}