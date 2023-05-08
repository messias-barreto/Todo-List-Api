import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    user: {
        name: string;
        login: string;
        email: string;
    },
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DaysDateProvider")
        private dateProvider: IDateProvider
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

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        const refresh_token = sign({ login }, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
        })

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);
        
        await this.userTokensRepository.create({
            expires_date,
            refresh_token,
            user_id: user.id
        })

        return { 
            user: {
                name: user.name,
                login: user.login,
                email: user.email
            }, 
            token,
            refresh_token
        }
    }
}

export { AuthenticateUserUseCase }