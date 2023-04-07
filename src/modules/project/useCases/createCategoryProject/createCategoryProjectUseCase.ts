import { AppErrors } from '../../../../shared/errors/AppErrors';
import { inject, injectable } from "tsyringe";
import { CategoryProject } from "../../infra/typeorm/entities/CategoryProject";
import { ICategoriesProjectRepository } from "../../interfaces/ICategoryProjectRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryProjectUseCase {
    constructor(
        @inject("CategoriesProjectRepository")
        private categoriesProjectRepository: ICategoriesProjectRepository
    ){}
    async execute({name, description}: IRequest): Promise<CategoryProject> {
        const categoryAlreadyExists = await this.categoriesProjectRepository.findCategoryByName(name);
        if(categoryAlreadyExists) {
            throw new AppErrors("Categories already Exists");
        }

        const category = await this.categoriesProjectRepository.create({ name, description })
        return category;
    }
}

export { CreateCategoryProjectUseCase }