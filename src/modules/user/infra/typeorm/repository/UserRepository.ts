import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../database/typeorm/data-source";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { User } from "../entities/User";


class UserRepository implements IUserRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = AppDataSource.getRepository(User);
    }

    async create({ name, email, login, password }: IUserDTO): Promise<User> {
        const user = this.repository.create({name, email, login, password});
        this.repository.save(user);

        return user;
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.repository.findOneBy({ email });
    }

    async findUserById(id: string): Promise<User> {
        return await this.repository.findOneBy({ id }); 
    }

    async findUserByLogin(login: string): Promise<User> {
        return await this.repository.findOneBy({ login }); 
    }

    async updateProfileUser({name, login, password, id}: IUserDTO): Promise<void> {
        await this.repository.createQueryBuilder()
        .update()
        .set({ name, login, password })
        .where("id = :id")
        .setParameters({id})
        .execute();
    }

    // async findUserByLoginAndPassword(login: string, password: string): Promise<User> {
    //     const user = this.repository.createQueryBuilder()
    //     .where('login = :login OR email = :login', { login })
    //     .andWhere('password = :password', { password })
    //     .getOne();

    //     return user;
    // }
}

export { UserRepository }