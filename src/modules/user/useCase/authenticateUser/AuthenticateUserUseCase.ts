import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "../../../../config/auth";

interface IRequest {
    user: {
        name: string;
        login: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute(login:string, password:string): Promise<IRequest>{
        const user = await this.userRepository.findUserByLogin(login);
        if(!user){
            throw new AppErrors("Login or Password incorrect");
        }

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppErrors("Login or Password incorrect");
        }

        const token = sign({}, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: "1d"
        })
        

        return { 
            user: {
                name: user.name,
                login: user.login
            }, 
            token 
        }
    }
}

export { AuthenticateUserUseCase }