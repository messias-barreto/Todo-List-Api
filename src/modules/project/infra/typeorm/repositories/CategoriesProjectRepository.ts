import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../../../../database/typeorm/data-source";
import { ICategoryProjectDTO } from "../../../dtos/ICategoryProjectDTO";
import { ICategoriesProjectRepository } from "../../../interfaces/ICategoryProjectRepository";
import { CategoryProject } from "../entities/CategoryProject";


class CategoriesProjectRepository implements ICategoriesProjectRepository {
    private repository: Repository<CategoryProject>;

    constructor(){
        this.repository = AppDataSource.getRepository(CategoryProject);
    }
    async create({name, description}: ICategoryProjectDTO): Promise<CategoryProject> {
        const category = this.repository.create({name, description});
        await this.repository.save(category);

        return category;
    }

    async findAllCategories(): Promise<CategoryProject[]> {
        return await this.repository.find();
    }

    async findCategoryById(id: string): Promise<CategoryProject> {
        return await this.repository.findOneBy({ id });
    }

    async findCategoryByName(name: string): Promise<CategoryProject> {
        return await this.repository.findOneBy({ name });
    }
}

export { CategoriesProjectRepository };