import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IprojectRepository } from "../../../project/interfaces/IProjectRepository";
import { Todo } from "../../infra/typeorm/entities/Todo";
import { ITodoRepository } from "../../interfaces/ITodoRepository";


class ListAllTodosProjectUseCase {
    constructor(
        private todoRepository: ITodoRepository,
        private projectRepository: IprojectRepository
    ){}

    async execute(project_id: string): Promise<Todo[]>{
        
        const projectAlreadyExists = await this.projectRepository.findProjectsById(project_id);
        if(!projectAlreadyExists) {
            throw new AppErrors("Project Does Not Exists!");
        }

        const todos = await this.todoRepository.findAllTodos(project_id);
        return todos;
    }
}

export { ListAllTodosProjectUseCase }