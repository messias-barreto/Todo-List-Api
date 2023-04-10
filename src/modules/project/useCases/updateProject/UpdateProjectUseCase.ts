import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../../user/interfaces/IUserRepository";
import { ICategoriesProjectRepository } from "../../interfaces/ICategoryProjectRepository";
import { IprojectRepository } from "../../interfaces/IProjectRepository";


interface IRequest {
    name: string;
    description: string; 
    category_id: string;
    id: string;
}

@injectable()
class UpdateProjectUseCase { 
    constructor(
        @inject("ProjectRepository")
        private projectRepository: IprojectRepository,
        @inject("CategoriesProjectRepository")
        private categoriesProjectRepository: ICategoriesProjectRepository
    ){}
    
    async execute({ name, description, category_id, id }: IProjectDTO): Promise<void> {
        const projectAlreadyExists = await this.projectRepository.findProjectsById(id);
        if(!projectAlreadyExists){
            throw new AppErrors("Project does not Found!");
        }

        await this.projectRepository.updateProject({
            name,
            description,
            category_id,
            id
        });
    }
}

export { UpdateProjectUseCase }