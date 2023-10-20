import { UserEntity } from "./user.entity";

export interface UserRepository {
    registerUser(user: UserEntity): Promise<UserEntity | null | string>;
    listUsers(): Promise<UserEntity[] | null>;
    updateUser({ id, role_id }: { id: string, role_id: string }): Promise<string | null>;
}