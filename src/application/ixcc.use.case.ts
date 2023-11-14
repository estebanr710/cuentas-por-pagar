import { IxCCEntity } from "../domain/ixcc/ixcc.entity";
import { IxCCRepository } from "../domain/ixcc/ixcc.repository";
import { IxCCValue } from "../domain/ixcc/ixcc.value";

export class IxCCUseCase {

    constructor(private readonly ixCCRepository: IxCCRepository) { }

    public registerIxCC = async ({ invoice_id, costcenter_id, percentage }: IxCCEntity) => {
        let ixCCValue = new IxCCValue({ invoice_id, costcenter_id, percentage });
        let ixCCCreated = await this.ixCCRepository.registerIxcc(ixCCValue);
        return ixCCCreated;
    }

    public getByInvoice = async (id: string) => {
        const IxCC = await this.ixCCRepository.getByInvoice(id);
        return IxCC;
    }
}