import { IStatusTodoDTO } from "../dtos/IStatusTodoDTO"; 
import { StatusTodo } from "../infra/typeorm/entities/StatusTodo";


interface IStatusTodoRepository { 
    create({name, description}: IStatusTodoDTO): Promise<StatusTodo>;
    findCategoryById(id: string): Promise<StatusTodo>
    findCategoryByName(name: string): Promise<StatusTodo>;
    findAllStatusTodo(): Promise<StatusTodo[]>;
}

export { IStatusTodoRepository }