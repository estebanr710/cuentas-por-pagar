import { UserEntity } from "../../../domain/user/user.entity";
import { UserRepository } from "../../../domain/user/user.repository";
import User from "../../models/local.users.schema";

export class MySqlUserRepository implements UserRepository {

    async findUserById(id: string): Promise<any> {
        const USER = await User.findOne({ where: { id } });
        return USER;
    }
    
    async registerUser(userData: any): Promise<any> {
        const USER = await User.create(userData);
        return USER;
    }
    
    async listUser(): Promise<any> {
        const USERS = await User.findAll();
        return USERS;
    }
}