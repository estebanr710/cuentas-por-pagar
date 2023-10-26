import { StateRepository } from "../../../domain/state/state.repository";

import State from "../../models/local.states.schema";

export class MySqlStateRepository implements StateRepository {

    async registerState(stateMock: any): Promise<any> {
        const STATE = await State.create(stateMock);
        return STATE;
    }
    
    async listStates(): Promise<any> {
        const STATES = await State.findAll();
        return STATES;
    }

    async listState(id: string): Promise<any | null> {
        const STATE = await State.findByPk(id)
        return STATE;
    }
}