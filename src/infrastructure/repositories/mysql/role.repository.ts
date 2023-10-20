import { RoleEntity } from "../../../domain/role/role.entity";
import { RoleRepository } from "../../../domain/role/role.repository";

import Role from "../../models/local.roles.schema";

export class MySqlRoleRepository implements RoleRepository {

    async registerRole(roleMock: any): Promise<any> {
        const ROLE = await Role.create(roleMock);
        return ROLE;
    }
    
    async listRoles(): Promise<any> {
        const ROLES = await Role.findAll();
        return ROLES;
    }
}