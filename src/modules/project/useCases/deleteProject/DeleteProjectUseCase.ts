import { inject, injectable } from "tsyringe";
import { IprojectRepository } from "../../interfaces/IProjectRepository";


@injectable()
class DeleteProjectUseCase { 
    constructor(
        @inject("ProjectRepository")
        private projectRepository: IprojectRepository
    ){}

    async execute(id: string): Promise<void>{
        await this.projectRepository.deleteProject(id);
    }
}

export { DeleteProjectUseCase }