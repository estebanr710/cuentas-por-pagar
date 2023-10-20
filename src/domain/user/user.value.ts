import { UserEntity } from "./user.entity";
import { v4 as uuid  } from "uuid";

const WITHOUT_ROLE_ID: string = process.env.WITHOUT_ROLE_ID ?? '2df2c4e2-5e77-4cbe-9e66-d08b4fc2a480';

export class UserValue implements UserEntity {
    
    id: string;
    use_name: string;
    use_email: string;
    use_microsoft_id: string;
    role_id: string;

    constructor({ use_name, use_email, use_microsoft_id, role_id }: UserEntity) {
        this.id = uuid();
        this.use_name = use_name;
        this.use_email = use_email;
        this.use_microsoft_id = use_microsoft_id;
        this.role_id = role_id ?? WITHOUT_ROLE_ID; // <Sin rol>: Role
    }
}