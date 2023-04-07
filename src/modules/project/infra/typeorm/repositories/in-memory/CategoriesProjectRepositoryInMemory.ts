import { CategoryProject } from "../../entities/CategoryProject"; 
import { ICategoriesProjectRepository } from "../../../../interfaces/ICategoryProjectRepository";
import { ICategoryProjectDTO } from "../../../../dtos/CategoryProject";


class CategoriesProjectRepositoryInMemory implements ICategoriesProjectRepository {
    categories: CategoryProject[] = [];
    
    async create({name, description}:ICategoryProjectDTO ): Promise<CategoryProject> {
        const category = new CategoryProject();
        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category);
        return category;
    }

    async findCategoryById(id: string): Promise<CategoryProject> {
        return this.categories.find(category => category.id ===   id);
    }

    async findCategoryByName(name: string): Promise<CategoryProject> {
        return this.categories.find(category => category.name === name);
    }
}

export { CategoriesProjectRepositoryInMemory }