import { ITodoDTO } from "../../../../dtos/ITodoDTO";
import { ITodoRepository } from "../../../../interfaces/ITodoRepository";
import { Todo } from "../../entities/Todo";


class TodoRepositoryInMemory implements ITodoRepository {
    todos: Todo[] = [];
    
    async create({ title, description, status, project_id }: ITodoDTO): Promise<Todo> {
        const todo = new Todo();
        Object.assign(todo, {
            title,
            description,
            status,
            project_id
        })

        this.todos.push(todo);
        return todo;
    }

    async deleteTodo(id: string): Promise<void> {
        
    }

    async findAllTodos(project_id: string): Promise<Todo[]> {
        const todo = this.todos.filter(todo => todo.project_id === project_id);
        return todo;
    }

    async findTodoById(id: string): Promise<Todo> {
        return this.todos.find(todo => todo.id === id);
    }

    async findTodoByTitle(title: string): Promise<Todo> {
        return this.todos.find(todo => todo.title === title);
    }
}

export { TodoRepositoryInMemory }