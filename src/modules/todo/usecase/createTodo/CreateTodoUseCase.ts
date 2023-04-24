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
            project_id,
            status: 'b6510aa9-e1b3-4e5e-9a4d-b1ab3b3d3d9b'
        });

        return todo;
    }
}

export { CreateTodoUseCase }