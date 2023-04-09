import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { hash } from "bcrypt";

@injectable()
class UpdateProfileUserUseCase {
    constructor(
        @inject("UserRepository")
        private updateProfileUserRepository: IUserRepository
    ){}
    async execute({ name, login, id }: IUserDTO): Promise<void> {
        await this.updateProfileUserRepository.updateProfileUser({ name, login, id });
    }
}

export { UpdateProfileUserUseCase }