import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../interfaces/IUserRepository";

@injectable()
class UpdatePasswordUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository  
    ){}
    async execute(id: string, password: string){
        const userAlreadyExists = await this.userRepository.findUserById(id);
        if(!userAlreadyExists) {
            throw new AppErrors("User does not Exists!");
        }

        const password_hash = await hash(password, 8);
        await this.userRepository.updatePasswordUser(password_hash, id);
    }
}

export { UpdatePasswordUserUseCase }