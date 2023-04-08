import { inject } from 'tsyringe';
import { injectable } from 'tsyringe';
import { CategoryProject } from "../../infra/typeorm/entities/CategoryProject";
import { ICategoriesProjectRepository } from "../../interfaces/ICategoryProjectRepository";

@injectable()
class ListAllCategoriesProjectUseCase {
    constructor(
        @inject("CategoriesProjectRepository")
        private categoriesProjectRepository: ICategoriesProjectRepository
    ){}

    async execute(): Promise<CategoryProject[]> {
        const categories = await this.categoriesProjectRepository.findAllCategories();
        return categories;
    }
}

export { ListAllCategoriesProjectUseCase }