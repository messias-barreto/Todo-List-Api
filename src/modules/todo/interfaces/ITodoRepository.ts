import { ITodoDTO } from "../dtos/ITodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";


interface ITodoRepository {
    create({ title, description, project_id, status }: ITodoDTO): Promise<Todo>;
    findAllTodos(project_id: string): Promise<Todo[]>;
    findTodoById(id: string): Promise<Todo>;
    findTodoByTitle(name: string, project_id: string): Promise<Todo>;
    deleteTodo(id: string): Promise<void>;
    finishTaskTodo(id: string, status: string): Promise<void>;
}

export { ITodoRepository }