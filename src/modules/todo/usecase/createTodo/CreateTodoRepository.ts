import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IprojectRepository } from "../../../project/interfaces/IProjectRepository";
import { ITodoDTO } from "../../dtos/ITodoDTO";
import { Todo } from "../../infra/typeorm/entities/Todo";
import { ITodoRepository } from "../../interfaces/ITodoRepository";


class CreateTodoRepository {
    constructor(
        private todoRepository: ITodoRepository,
        private projectRepository: IprojectRepository
    ){}
    async execute({ title, description, status, project_id }: ITodoDTO):Promise<Todo> {
        const projectAlreadyExists = await this.projectRepository.findProjectsById(project_id);
        if(!projectAlreadyExists) {
            throw new AppErrors("Project does not Exists!");
        }

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