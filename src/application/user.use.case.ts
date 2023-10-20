import { UserEntity } from "../domain/user/user.entity";
import { UserRepository } from "../domain/user/user.repository";
import { UserValue } from "../domain/user/user.value";

export class UserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    public registerUser = async ({ use_name, use_email, use_microsoft_id, role_id }: UserEntity) => {
        let userValue = new UserValue({ use_name, use_email, use_microsoft_id, role_id });
        let userCreated = await this.userRepository.registerUser(userValue);
        return userCreated;
    }

    public getUsers = async () => {
        const USERS = await this.userRepository.listUsers();
        return USERS;
    }

    public changeUserRole = async ({ id, role_id }: { id: string, role_id: string }) => {
        const USER = await this.userRepository.updateUser({ id, role_id });
        return USER;
    }
}