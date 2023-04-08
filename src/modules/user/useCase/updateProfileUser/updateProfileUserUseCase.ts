import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { hash } from "bcrypt";

@injectable()
class UpdateProfileUserUseCase {
    constructor(
        @inject("UserRepository")
        private updateProfileUserRepository: IUserRepository
    ){}
    async execute({ name, login, password, id }: IUserDTO): Promise<void> {
        const password_hash = await hash(password, 8);

        await this.updateProfileUserRepository.updateProfileUser({
            name, 
            login, 
            password: password_hash, 
            id
        });
    }
}

export { UpdateProfileUserUseCase }