import { UserEntity } from "./user.entity";
import { v4 as uuid  } from "uuid"; 

export class UserValue implements UserEntity {
    
    id: string;
    name: string;
    email: string;
    description: string;

    constructor({ name, email, description }: { name: string, email: string, description?: string }) {
        this.id = uuid();
        this.email = email;
        this.name = name;
        this.description = description ?? '__default__';
    }
}