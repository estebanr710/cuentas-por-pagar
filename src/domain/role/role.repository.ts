import { RoleEntity } from "./role.entity";

export interface RoleRepository {
    registerRole(role: RoleEntity): Promise<RoleEntity | null>;
    listRoles(): Promise<RoleEntity[] | null>;
    listRole(id: string): Promise<RoleEntity | null>;
}