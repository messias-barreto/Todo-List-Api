import { IUserRepository } from "../../../../interfaces/IUserRepository";
import { User } from "../../entities/User"


class UserRepositoryInMemory implements IUserRepository { 
    users: User[] = [];

    async create({ name, email, login, password }: IUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            name,
            email,
            login,
            password
        })

        this.users.push(user);
        return user;
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email); 
    }

    async findUserById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

    async findUserByLogin(login: string): Promise<User> {
     return this.users.find(user => user.login === login);   
    }
}

export { UserRepositoryInMemory }