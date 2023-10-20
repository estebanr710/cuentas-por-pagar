import { RoleEntity } from "../domain/role/role.entity";
import { RoleRepository } from "../domain/role/role.repository";
import { RoleValue } from "../domain/role/role.value";

export class RoleUseCase {

    constructor(private readonly roleRepository: RoleRepository) { }

    public registerRole = async ({ rol_description }: RoleEntity) => {
        let roleRepository = new RoleValue({ rol_description });
        let roleCreated = await this.roleRepository.registerRole(roleRepository);
        return roleCreated;
    }

    public getRoles = async () => {
        const ROLES = await this.roleRepository.listRoles();
        return ROLES;
    }
}