import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../database/typeorm/data-source";
import { ITodoDTO } from "../../../dtos/ITodoDTO";
import { ITodoRepository } from "../../../interfaces/ITodoRepository";
import { Todo } from "../entities/Todo";



class TodoRepository implements ITodoRepository {
    private repository: Repository<Todo>;

    constructor() {
        this.repository = AppDataSource.getRepository(Todo);
    }

    async create({ title, description, project_id }: ITodoDTO): Promise<Todo> {
        const todo = this.repository.create({
            title,
            description,
            project_id,
            status: 'b6510aa9-e1b3-4e5e-9a4d-b1ab3b3d3d9b'
        });

        await this.repository.save(todo);
        return todo;
    }

    async findAllTodos(project_id: string): Promise<Todo[]> {
        const todos = await this.repository.query(
                        `select todos.id as id, 
                                todos.title as title, 
                                todos.description,
                                status_todo."name" as status
                        from  todos,
                              status_todo
                        where    status_todo.id  = todos.status
                        and      todos.project_id = '${project_id}'
                        order by status_todo.ordem, todos.title`);
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

    async finishTaskTodo(id: string, status: string): Promise<void> {
        await this.repository.createQueryBuilder()
            .update()
            .set({ status })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async deleteTodo(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { TodoRepository }