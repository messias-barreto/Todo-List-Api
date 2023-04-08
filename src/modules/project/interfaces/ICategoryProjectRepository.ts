import { ICategoryProjectDTO } from "../dtos/ICategoryProjectDTO";
import { CategoryProject } from "../infra/typeorm/entities/CategoryProject";

interface ICategoriesProjectRepository { 
    create({name, description}: ICategoryProjectDTO): Promise<CategoryProject>;
    findAllCategories(): Promise<CategoryProject[]>
    findCategoryById(id: string): Promise<CategoryProject>
    findCategoryByName(name: string): Promise<CategoryProject>;
}

export  { ICategoriesProjectRepository }