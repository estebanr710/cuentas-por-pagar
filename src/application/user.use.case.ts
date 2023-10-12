import { UserRepository } from "../domain/user/user.repository";
import { UserValue } from "../domain/user/user.value";

export class UserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    public async registerUser({ name, email, description }: { name: string, email: string, description: string }) {
        let userValue = new UserValue({ name, email });
        let userCreated = await this.userRepository.registerUser(userValue);
        return userCreated;
    }

    public async getDetailUser(id: string) {
        const USER = await this.userRepository.findUserById(id);
        return USER;
    }
}