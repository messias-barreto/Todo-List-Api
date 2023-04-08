import { inject, injectable } from "tsyringe";
import { CategoryProject } from "../../infra/typeorm/entities/CategoryProject";
import { ICategoriesProjectRepository } from "../../interfaces/ICategoryProjectRepository";

@injectable()
class ListCategoriesProjectUseCase {
    constructor(
        @inject("CategoriesProjectRepository")
        private categoriesProjectRepository: ICategoriesProjectRepository
    ) {}

    async execute(id: string): Promise<CategoryProject> {
        return await this.categoriesProjectRepository.findCategoryById(id);
    }
}

export { ListCategoriesProjectUseCase }