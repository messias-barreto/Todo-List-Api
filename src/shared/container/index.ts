import { container } from "tsyringe";
import { CategoriesProjectRepository } from "../../modules/project/infra/typeorm/repositories/CategoriesProjectRepository";
import { ICategoriesProjectRepository } from "../../modules/project/interfaces/ICategoryProjectRepository";
import { StatusTodoRepository } from "../../modules/todo/infra/typeorm/repositories/StatusTodoRepository";
import { IStatusTodoRepository } from "../../modules/todo/interfaces/IStatusTodoRepository";


container.registerSingleton<ICategoriesProjectRepository>(
    "CategoriesProjectRepository",
    CategoriesProjectRepository
);

container.registerSingleton<IStatusTodoRepository>(
    "StatusTodoRepository",
    StatusTodoRepository
);