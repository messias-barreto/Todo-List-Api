import { container } from "tsyringe";
import { CategoriesProjectRepository } from "../../modules/project/infra/typeorm/repositories/CategoriesProjectRepository";
import { ICategoriesProjectRepository } from "../../modules/project/interfaces/ICategoryProjectRepository";


container.registerSingleton<ICategoriesProjectRepository>(
    "CategoriesProjectRepository",
    CategoriesProjectRepository
);