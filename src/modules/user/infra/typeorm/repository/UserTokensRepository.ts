import { AppDataSource } from './../../../../../database/typeorm/data-source';
import { Repository } from "typeorm";
import { IUserTokensDTO } from "../../../dtos/IUserTokensDTO";
import { IUserTokensRepository } from "../../../interfaces/IUserTokensRepository";
import { UserTokens } from "../entities/UserTokens";


class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserTokens>

    constructor(){
        this.repository = AppDataSource.getRepository(UserTokens);
    }

    async create({ expires_date, refresh_token, user_id }: IUserTokensDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);
        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userTokens = await this.repository.findOneBy({ 
            user_id,
            refresh_token 
        });

        return userTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}


export { UserTokensRepository }