import { UserRepository } from "../../../domain/user/user.repository";

import Role from "../../models/local.roles.schema";
import User from "../../models/local.users.schema";

import { MySqlRoleRepository } from "./role.repository";

export class MySqlUserRepository implements UserRepository {

    constructor(private mysqlRoleRepository = new MySqlRoleRepository) {}

    async updateUser({ id, role_id }: { id: string, role_id: string }): Promise<string> {
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
        let { use_microsoft_id } = userMock;
        const CHECK_USER = await this.listUserById(use_microsoft_id);
        if (!CHECK_USER) {
            const USER = await User.create(userMock);
            return USER;
        } else {
            return CHECK_USER;
        }
    }

    async listUsers(): Promise<any> {
        const USERS = await User.findAll({
            include: [
                {
                    model: Role
                }
            ],
            attributes: {
                exclude: [
                    "use_microsoft_id",
                    "role_id"
                ]
            }
        });
        return USERS;
    }

    private async listUserById(use_microsoft_id: string): Promise<any> {
        const USER = await User.findOne({
            include: [
                {
                    model: Role
                }
            ],
            attributes: {
                exclude: [
                    "role_id",
                    "use_microsoft_id"
                ]
            },
            where: { use_microsoft_id } 
        });
        return USER;
    }

    public async listUserByIdV2(id: string): Promise<any> {
        const USER = await User.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Role
                }
            ]
        });
        return USER;
    }
}