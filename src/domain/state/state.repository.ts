import { StateEntity } from "./state.entity";

export interface StateRepository {
    registerState(state: StateEntity): Promise<StateEntity | null>;
    listStates(): Promise<StateEntity[] | null>;
    listState(id: string): Promise<StateEntity | null>;
}