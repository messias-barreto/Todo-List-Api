import { AppErrors } from './../../../../shared/errors/AppErrors';
import { inject, injectable } from "tsyringe";
import { Project } from "../../infra/typeorm/entities/Project";
import { IprojectRepository } from "../../interfaces/IProjectRepository";

@injectable()
class CreateProjectUseCase {
    constructor(
        @inject("ProjectRepository")
        private projectRepository: IprojectRepository
    ){}

    async execute({ name, description, category_id, user_id }: IProjectDTO): Promise<Project> {
        const projectAlreadyExists = await this.projectRepository.findProjectByName(name);
        if(projectAlreadyExists){
            throw new AppErrors("Project Already Exists!");
        }
        
        const project = await this.projectRepository.create({
            name,
            description,
            category_id,
            user_id
        });

        return project;
    }
}

export { CreateProjectUseCase }