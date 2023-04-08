import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";


@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute({name, email, login, password}: IUserDTO): Promise<User> {
        const emailAlreadyExists = await this.userRepository.findUserByEmail(email);
        if(emailAlreadyExists){
            throw new AppErrors("Email Already Exists!");
        }

        const loginAlreadyExists = await this.userRepository.findUserByLogin(login);
        if(loginAlreadyExists){
            throw new AppErrors("Login Already Exists!");
        }

        const user = await this.userRepository.create({name, email, login, password});
        return user;
    }
}

export { CreateUserUseCase }