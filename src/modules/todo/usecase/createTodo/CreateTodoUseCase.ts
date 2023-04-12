import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IprojectRepository } from "../../../project/interfaces/IProjectRepository";
import { ITodoDTO } from "../../dtos/ITodoDTO";
import { Todo } from "../../infra/typeorm/entities/Todo";
import { ITodoRepository } from "../../interfaces/ITodoRepository";

@injectable()
class CreateTodoUseCase {
    constructor(
        @inject("TodoRepository")
        private todoRepository: ITodoRepository,
        @inject("ProjectRepository")
        private projectRepository: IprojectRepository
    ){}
    async execute({ title, description, project_id }: ITodoDTO):Promise<Todo> {
        const projectAlreadyExists = await this.projectRepository.findProjectsById(project_id);
        if(!projectAlreadyExists) {
            throw new AppErrors("Project does not Exists!");
        }

        const todoAlreadyExists = await this.todoRepository.findTodoByTitle(title);
        if(todoAlreadyExists){
            throw new AppErrors("Todo already Exists!");
        }

        const todo = await this.todoRepository.create({
            title, 
            description,
            project_id
        });

        return todo;
    }
}

export { CreateTodoUseCase }