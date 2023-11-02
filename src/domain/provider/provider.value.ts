import { ProviderEntity } from "./provider.entity";
import { v4 as uuid  } from "uuid"; 

export class ProviderValue implements ProviderEntity {
    
    id: string;
    pro_name: string;
    pro_email: string | null;
    pro_state: boolean;

    constructor({ pro_name, pro_email, pro_state }: ProviderEntity) {
        this.id = uuid();
        this.pro_name = pro_name;
        this.pro_email = pro_email ? pro_email : null;
        this.pro_state = pro_state ? pro_state : true;
    }
}