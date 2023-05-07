import { hash, compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../interfaces/IUserRepository";

@injectable()
class UpdatePasswordUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository  
    ){}
    async execute(id: string, currentPassword:string, newPassword: string){
        const userAlreadyExists = await this.userRepository.findUserById(id);
        if(!userAlreadyExists) {
            throw new AppErrors("User does not Exists!");
        }

        const passwordMatch = await compare(currentPassword, userAlreadyExists.password);
        if(!passwordMatch) {
            throw new AppErrors("Senha Informada está Incorreta!");
        }

        const password_hash = await hash(newPassword, 8);
        await this.userRepository.updatePasswordUser(password_hash, id);
    }
}

export { UpdatePasswordUserUseCase }