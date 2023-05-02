import { AppErrors } from './../../../../shared/errors/AppErrors';
import { inject, injectable } from "tsyringe";
import { Project } from "../../infra/typeorm/entities/Project";
import { IprojectRepository } from "../../interfaces/IProjectRepository";
import { ICategoriesProjectRepository } from '../../interfaces/ICategoryProjectRepository';
import { IUserRepository } from '../../../user/interfaces/IUserRepository';

@injectable()
class CreateProjectUseCase {
    constructor(
        @inject("ProjectRepository")
        private projectRepository: IprojectRepository,
        @inject("CategoriesProjectRepository")
        private categoriesProjectRepository: ICategoriesProjectRepository,
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute({ name, description, category_id, user_id }: IProjectDTO): Promise<Project> {
        const categoryProjectAlreadyExists = await this.categoriesProjectRepository.findCategoryById(category_id);
        if(!categoryProjectAlreadyExists){
            throw new AppErrors("Category does not Exists!");
        }

        const userAlreadyExists = await this.userRepository.findUserById(user_id);
        if(!userAlreadyExists){
            throw new AppErrors("User does not Exists!");
        }

        const projectAlreadyExists = await this.projectRepository.findProjectByName(name, user_id);

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