import { UserRepository } from "../../../domain/user/user.repository";
import User from "../../models/local.users.schema";
import { MySqlRoleRepository } from "./role.repository";

export class MySqlUserRepository implements UserRepository {

    constructor(private mysqlRoleRepository = new MySqlRoleRepository) {}

    async updateUser({ id, role_id }: { id: string, role_id: string }): Promise<any | null> {
        let msg = '';
        const CHECK_ROLE = await this.mysqlRoleRepository.listRole(role_id);
        if (CHECK_ROLE) {  
            await User.update({ role_id }, { where: { id } });
            msg = "USER_UPDATED";
        } else {
            msg = "ROLE_NOT_EXISTS";
        }
        return msg;
    }
    
    async registerUser(userMock: any): Promise<any> {
        const USER = await User.create(userMock);
        return USER;
    }
    
    async listUsers(): Promise<any> {
        const USERS = await User.findAll();
        return USERS;
    }
}