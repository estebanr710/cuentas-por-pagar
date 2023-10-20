import { UserRepository } from "../domain/user/user.repository";
import { UserValue } from "../domain/user/user.value";

export class UserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    public registerUser = async ({ use_name, use_email, use_microsoft_id, role_id }: UserValue) => {
        let userValue = new UserValue({ use_name, use_email, use_microsoft_id, role_id });
        let userCreated = await this.userRepository.registerUser(userValue);
        return userCreated;
    }

    /* public getDetailUser = async (id: string) => {
        const USER = await this.userRepository.findUserById(id);
        return USER;
    } */
}