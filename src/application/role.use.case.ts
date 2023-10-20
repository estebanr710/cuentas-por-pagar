import { RoleRepository } from "../domain/role/role.repository";
import { RoleValue } from "../domain/role/role.value";

export class RoleUseCase {

    constructor(private readonly roleRepository: RoleRepository) { }

    public registerRole = async ({ rol_description }: RoleValue) => {
        let roleRepository = new RoleValue({ rol_description });
        let roleCreated = await this.roleRepository.registerRole(roleRepository);
        return roleCreated;
    }

    /* public getDetailUser = async (id: string) => {
        const USER = await this.userRepository.findUserById(id);
        return USER;
    } */
}