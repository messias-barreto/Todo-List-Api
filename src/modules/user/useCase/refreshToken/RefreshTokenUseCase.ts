import { inject, injectable } from 'tsyringe';
import { verify, sign } from 'jsonwebtoken';

import { IUserTokensRepository } from '../../interfaces/IUserTokensRepository';
import auth from '../../../../config/auth';
import { AppErrors } from '../../../../shared/errors/AppErrors';
import dayjs from 'dayjs';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
    sub: string;
    login: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DaysDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute(token: string): Promise<ITokenResponse> {
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

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

        await this.userTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        });

        return {
            refresh_token,
            token: newToken
        }
    }
}

export { RefreshTokenUseCase }