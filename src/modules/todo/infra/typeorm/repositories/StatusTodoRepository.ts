import { AppDataSource } from './../../../../../database/typeorm/data-source';
import { Repository } from 'typeorm';
import { IStatusTodoDTO } from "../../../dtos/IStatusTodoDTO";
import { IStatusTodoRepository } from "../../../interfaces/IStatusTodoRepository";
import { StatusTodo } from "../entities/StatusTodo";


class StatusTodoRepository implements IStatusTodoRepository {
    private repository: Repository<StatusTodo>;

    constructor(){
        this.repository = AppDataSource.getRepository(StatusTodo);
    }

    async create({ name, description }: IStatusTodoDTO): Promise<StatusTodo> {
        const status = this.repository.create({name, description});
        this.repository.save(status);

        return status;
    }

    async findAllStatusTodo(): Promise<StatusTodo[]> {
        const status = await this.repository.find();
        return status;
    }

    async findCategoryById(id: string): Promise<StatusTodo> {
        return await this.repository.findOneBy({ id });
    }

    async findCategoryByName(name: string): Promise<StatusTodo> {
        return await this.repository.findOneBy({ name });
    }
}

export { StatusTodoRepository }