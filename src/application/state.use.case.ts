import { StateEntity } from "../domain/state/state.entity";
import { StateRepository } from "../domain/state/state.repository";
import { StateValue } from "../domain/state/state.value";

export class StateUseCase {

    constructor(private readonly stateRepository: StateRepository) { }

    public registerState = async ({ sta_description }: StateEntity) => {
        let stateValue = new StateValue({ sta_description });
        let stateCreated = await this.stateRepository.registerState(stateValue);
        return stateCreated;
    }

    public getStates = async () => {
        const STATES = await this.stateRepository.listStates();
        return STATES;
    }

    public getState = async (id: string) => {
        const STATE = await this.stateRepository.listState(id);
        return STATE;
    }
}