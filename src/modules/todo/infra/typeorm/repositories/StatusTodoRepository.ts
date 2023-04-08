import { AppDataSource } from './../../../../../database/typeorm/data-source';
import { Repository } from 'typeorm';
import { IStatusTodoDTO } from "../../../dtos/IStatusTodoDTO";
import { IStatusTodoRepository } from "../../../interfaces/IStatusTodoRepository";
import { StatusTodo } from "../entities/StatusTodo";


class StatusTodoRepository implements IStatusTodoRepository {
    private repositoy: Repository<StatusTodo>;

    constructor(){
        this.repositoy = AppDataSource.getRepository(StatusTodo);
    }

    async create({ name, description }: IStatusTodoDTO): Promise<StatusTodo> {
        const status = this.repositoy.create({name, description});
        this.repositoy.save(status);

        return status;
    }

    async findCategoryById(id: string): Promise<StatusTodo> {
        return await this.repositoy.findOneBy({ id });
    }

    async findCategoryByName(name: string): Promise<StatusTodo> {
        return await this.repositoy.findOneBy({ name });
    }
}

export { StatusTodoRepository }