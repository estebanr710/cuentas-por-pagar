import { IxCCEntity } from "./ixcc.entity";

export interface IxCCRepository {
    registerIxcc(mock: IxCCEntity): Promise<IxCCEntity | null | string>;
    getByInvoice(id: string): Promise<any>;
}