import { UserEntity } from "../../domain/user/user.entity";
import { UserRepository } from "../../domain/user/user.repository";

export class MysqlRepository implements UserRepository {

    findUserById(uuid: string): Promise<UserEntity | null> {
        throw new Error(`...`);
    }
    
    registerUser(user: UserEntity): Promise<UserEntity | null> {
        throw new Error(`...`);
    }
    
    listUser(): Promise<UserEntity[] | null> {
        throw new Error(`...`);
    }
}