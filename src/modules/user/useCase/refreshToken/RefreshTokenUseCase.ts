import { inject, injectable } from 'tsyringe';
import { verify, sign } from 'jsonwebtoken';

import { IUserTokensRepository } from '../../interfaces/IUserTokensRepository';
import auth from '../../../../config/auth';
import { AppErrors } from '../../../../shared/errors/AppErrors';
import dayjs from 'dayjs';

interface IPayload {
    sub: string;
    login: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository
    ) {}
    async execute(token: string): Promise<string> {
        const {sub, login } = verify(token, auth.secret_refresh_token) as IPayload;
        const user_id = sub; 

        const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
            user_id, 
            token
        );
        
        if(!userToken) {
            throw new AppErrors("Refresh Token does not Exists!")
        }

        await this.userTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ login }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token
        })

        const expires_date = dayjs().add(auth.expires_refresh_token_days, "days").toDate();

        await this.userTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        return refresh_token;
    }
}

export { RefreshTokenUseCase }