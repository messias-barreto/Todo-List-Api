import { ICategoryProjectDTO } from "../dtos/CategoryProject";
import { CategoryProject } from "../infra/typeorm/entities/CategoryProject";

interface ICategoriesProjectRepository { 
    create({name, description}: ICategoryProjectDTO): Promise<CategoryProject>;
    findCategoryById(id: string): Promise<CategoryProject>
    findCategoryByName(name: string): Promise<CategoryProject>;
}

export  { ICategoriesProjectRepository }