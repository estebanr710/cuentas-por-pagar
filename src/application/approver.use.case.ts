import { ApproverEntity } from "../domain/approver/approver.entity";
import { ApproverRepository } from "../domain/approver/approver.repository";
import { ApproverValue } from "../domain/approver/approver.value";

export class ApproverUseCase {

    constructor(private readonly approverRepository: ApproverRepository) { }

    public registerApprover = async ({ invoice_id, user_id }: ApproverEntity) => {
        let approverValue = new ApproverValue({ invoice_id, user_id });
        let approverCreated = await this.approverRepository.registerApprover(approverValue);
        return approverCreated;
    }
}