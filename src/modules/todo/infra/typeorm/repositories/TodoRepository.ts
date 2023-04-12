import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../database/typeorm/data-source";
import { ITodoDTO } from "../../../dtos/ITodoDTO";
import { ITodoRepository } from "../../../interfaces/ITodoRepository";
import { Todo } from "../entities/Todo";



class TodoRepository implements ITodoRepository {
    private repository: Repository<Todo>;

    constructor(){
        this.repository = AppDataSource.getRepository(Todo);
    }

    async create({ title, description, project_id }: ITodoDTO): Promise<Todo> {
        const todo = this.repository.create({
            title,
            description,
            status: 'a4f26f01-2d94-48d3-823c-8af303edefc0',
            project_id
        });    

        await this.repository.save(todo);
        return todo;
    }

    async findAllTodos(project_id: string): Promise<Todo[]> {
        const todos = await this.repository.findBy({ project_id });
        return todos;
    }

    async findTodoById(id: string): Promise<Todo> {
        const todo = await this.repository.findOneBy({ id });
        return todo;
    }

    async findTodoByTitle(title: string): Promise<Todo> {
        const todo = await this.repository.findOneBy({ title });
        return todo;
    }

    async deleteTodo(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { TodoRepository }