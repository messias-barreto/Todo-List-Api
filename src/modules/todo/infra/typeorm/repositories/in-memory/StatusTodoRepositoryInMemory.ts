import { IStatusTodoDTO } from "../../../../dtos/IStatusTodoDTO";
import { IStatusTodoRepository } from "../../../../interfaces/IStatusTodoRepository";
import { StatusTodo } from "../../entities/StatusTodo";


class StatusTodoRepositoryInMemory implements IStatusTodoRepository {
    status: StatusTodo[] = [];

    async create({ name, description }: IStatusTodoDTO): Promise<StatusTodo> {
        const new_status = new StatusTodo();
        
        Object.assign(new_status, {
            name, 
            description
        }) 
        
        this.status.push(new_status);
        return new_status;
    }

    async findAllStatusTodo(): Promise<StatusTodo[]> {
        return this.status;
    }

    async findCategoryById(id: string): Promise<StatusTodo> {
        const find_status = this.status.find(status => status.id === id);
        return find_status;
    }

    async findCategoryByName(name: string): Promise<StatusTodo> {
        const find_status = this.status.find(status => status.name === name);
        return find_status;
    }
}

export { StatusTodoRepositoryInMemory }