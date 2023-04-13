import { container } from "tsyringe";
import { CategoriesProjectRepository } from "../../modules/project/infra/typeorm/repositories/CategoriesProjectRepository";
import { ProjectRepository } from "../../modules/project/infra/typeorm/repositories/ProjectRepository";
import { ICategoriesProjectRepository } from "../../modules/project/interfaces/ICategoryProjectRepository";
import { IprojectRepository } from "../../modules/project/interfaces/IProjectRepository";
import { StatusTodoRepository } from "../../modules/todo/infra/typeorm/repositories/StatusTodoRepository";
import { TodoRepository } from "../../modules/todo/infra/typeorm/repositories/TodoRepository";
import { IStatusTodoRepository } from "../../modules/todo/interfaces/IStatusTodoRepository";
import { ITodoRepository } from "../../modules/todo/interfaces/ITodoRepository";
import { UserRepository } from "../../modules/user/infra/typeorm/repository/UserRepository";
import { UserTokensRepository } from "../../modules/user/infra/typeorm/repository/UserTokensRepository";
import { IUserRepository } from "../../modules/user/interfaces/IUserRepository";
import { IUserTokensRepository } from "../../modules/user/interfaces/IUserTokensRepository";


container.registerSingleton<ICategoriesProjectRepository>(
    "CategoriesProjectRepository",
    CategoriesProjectRepository
);

container.registerSingleton<IStatusTodoRepository>(
    "StatusTodoRepository",
    StatusTodoRepository
);

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<IprojectRepository>(
    "ProjectRepository",
    ProjectRepository
)

container.registerSingleton<ITodoRepository>(
    "TodoRepository",
    TodoRepository
)

container.registerSingleton<IUserTokensRepository>(
    "UserTokensRepository",
    UserTokensRepository
)