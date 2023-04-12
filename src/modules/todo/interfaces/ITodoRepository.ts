import { ITodoDTO } from "../dtos/ITodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";


interface ITodoRepository {
    create({ title, description, status, project_id }: ITodoDTO): Promise<Todo>;
    findAllTodos(project_id: string): Promise<Todo[]>;
    findTodoById(id: string): Promise<Todo>;
    findTodoByTitle(name: string): Promise<Todo>;
    deleteTodo(id: string): Promise<void>;
}

export { ITodoRepository }