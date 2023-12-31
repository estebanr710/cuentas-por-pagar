import { RoleEntity } from "../domain/role/role.entity";
import { RoleRepository } from "../domain/role/role.repository";
import { RoleValue } from "../domain/role/role.value";

export class RoleUseCase {

    constructor(private readonly roleRepository: RoleRepository) { }

    public registerRole = async ({ rol_description }: RoleEntity) => {
        let roleValue = new RoleValue({ rol_description });
        let roleCreated = await this.roleRepository.registerRole(roleValue);
        return roleCreated;
    }

    public getRoles = async () => {
        const ROLES = await this.roleRepository.listRoles();
        return ROLES;
    }

    public getRole = async (id: string) => {
        const ROLE = await this.roleRepository.listRole(id);
        return ROLE;
    }
}