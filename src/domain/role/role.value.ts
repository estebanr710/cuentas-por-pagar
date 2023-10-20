import { RoleEntity } from "./role.entity";
import { v4 as uuid  } from "uuid"; 

export class RoleValue implements RoleEntity {
    
    id: string;
    rol_description: string;

    constructor({ rol_description }: RoleEntity) {
        this.id = uuid();
        this.rol_description = rol_description;
    }
}