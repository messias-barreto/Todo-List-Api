import { User } from "../infra/typeorm/entities/User"


interface IUserRepository {
    create({ name, email, login, password }: IUserDTO): Promise<User>
    findUserById(id: string): Promise<User>
    findUserByLogin(login: string): Promise<User>
    findUserByEmail(email: string): Promise<User>
    updateProfileUser({name, login, password, id}: IUserDTO): Promise<void>
}

export { IUserRepository }