import { StateEntity } from "./state.entity";
import { v4 as uuid  } from "uuid"; 

export class StateValue implements StateEntity {
    
    id: string;
    sta_description: string;

    constructor({ sta_description }: StateEntity) {
        this.id = uuid();
        this.sta_description = sta_description;
    }
}