import { UserRepository } from "../domain/user/user.repository";
import { UserValue } from "../domain/user/user.value";

export class UserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    public async registerUser({ name, email, description }: { name: string, email: string, description: string }) {
        const userValue = new UserValue({ name, email });
        const userCreated = await this.userRepository.registerUser(userValue);
        return userCreated;
    }

    public registerUserAddNotify() {
        // Something else here...
    }
}