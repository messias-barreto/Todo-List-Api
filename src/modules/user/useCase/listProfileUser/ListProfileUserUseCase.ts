import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";

@injectable()
class ListProfileUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findUserById(id);
        return user;
    }
}

export { ListProfileUserUseCase }