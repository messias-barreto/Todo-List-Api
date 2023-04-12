import { IprojectRepository } from "../../../project/interfaces/IProjectRepository";
import { ITodoDTO } from "../../dtos/ITodoDTO";
import { ITodoRepository } from "../../interfaces/ITodoRepository";


class CreateTodoRepository {
    constructor(
        private todoRepository: ITodoRepository,
        private projectRepository: IprojectRepository
    ){}
    async execute({ title, description, status, project_id }: ITodoDTO){
        const todo = await this.todoRepository.create({
            title, 
            description,
            status,
            project_id
        });

        return todo;
    }
}

export { CreateTodoRepository }