import { ITodoDTO } from "../../../../dtos/ITodoDTO";
import { ITodoRepository } from "../../../../interfaces/ITodoRepository";
import { Todo } from "../../entities/Todo";


class TodoRepositoryInMemory implements ITodoRepository {
    todos: Todo[] = [];
    
    async create({ title, description, project_id }: ITodoDTO): Promise<Todo> {
        const todo = new Todo();
        Object.assign(todo, {
            title,
            description,
            status: 1,
            project_id
        })

        this.todos.push(todo);
        return todo;
    }

    async findAllTodos(project_id: string): Promise<Todo[]> {
        const todo = this.todos.filter(todo => todo.project_id === project_id);
        return todo;
    }

    async findTodoById(id: string): Promise<Todo> {
        return this.todos.find(todo => todo.id === id);
    }

    async findTodoByTitle(title: string, project_id: string): Promise<Todo> {
        return this.todos.find(todo => todo.title === title && todo.project_id === project_id);
    }

    async finishTaskTodo(id: string): Promise<void> {
        
    }

    async deleteTodo(id: string): Promise<void> {
        const todos = this.todos.filter(todo => todo.id !== id);
        this.todos = todos;    
    }
}

export { TodoRepositoryInMemory }