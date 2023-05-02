import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../../user/interfaces/IUserRepository";
import { Project } from "../../infra/typeorm/entities/Project";
import { IprojectRepository } from "../../interfaces/IProjectRepository";

@injectable()
class ListProjectByIdUseCase {
    constructor(
        @inject("ProjectRepository")
        private projectRepository: IprojectRepository,
    ){}
    
    async execute(user_id: string): Promise<Project>{ 
        const project = await this.projectRepository.findProjectsById(user_id);
        if(!project) {
            throw new AppErrors('Project does not Exists!');
        }

        return project;
    }
}

export { ListProjectByIdUseCase }