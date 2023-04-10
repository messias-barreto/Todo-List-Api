import { UserRepositoryInMemory } from "../../../user/infra/typeorm/repository/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../user/useCase/createUser/CreateUserUseCase";
import { CategoriesProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesProjectRepositoryInMemory";
import { ProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/ProjectRepositoryInMemory"
import { CreateCategoryProjectUseCase } from "../createCategoryProject/CreateCategoryProjectUseCase";
import { CreateProjectUseCase } from "./CreateProjectUseCase";
import { AppErrors } from './../../../../shared/errors/AppErrors';


describe("Create a new Project", () => {
    let projectRepository: ProjectRepositoryInMemory;
    let userRepository: UserRepositoryInMemory;
    let categoriesProjectRepository: CategoriesProjectRepositoryInMemory;

    let createUserUseCase: CreateUserUseCase;
    let createCategoryProjectUseCase: CreateCategoryProjectUseCase;
    let createProjectUseCase: CreateProjectUseCase;


    beforeEach(() => {
        projectRepository = new ProjectRepositoryInMemory();
        userRepository = new UserRepositoryInMemory();
        categoriesProjectRepository = new CategoriesProjectRepositoryInMemory();

        createUserUseCase = new CreateUserUseCase(userRepository);
        createCategoryProjectUseCase = new CreateCategoryProjectUseCase(categoriesProjectRepository);
        createProjectUseCase = new CreateProjectUseCase(projectRepository, categoriesProjectRepository);
    });

    it("Shold be able to Create a New Project", async () => {
        //Criar Usuário
        const user = await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        //Criar Categoria
        const category = await createCategoryProjectUseCase.execute({
            name: "any_name",
            description: "any_description"
        });

        const project = await createProjectUseCase.execute({
            name: "any_project",
            description: "any_description",
            category_id: category.id,
            user_id: user.id
        })

        expect(project).toHaveProperty("id");
    });

    it("Shold not be able create a Project if Name Already Exists!", async () => {
        const user = await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        const category = await createCategoryProjectUseCase.execute({
            name: "any_name",
            description: "any_description"
        });

        await createProjectUseCase.execute({
            name: "any_project",
            description: "ayn_description",
            category_id: category.id,
            user_id: user.id
        })
        
        await expect(   
            createProjectUseCase.execute({
                name: "any_project",
                description: "ayn_description",
                category_id: category.id,
                user_id: user.id
            })
        ).rejects.toEqual(new AppErrors("Project Already Exists!"));
    });

    it("Shold not be able to create project if category does not Exists!", async () => {
        const user = await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        await expect(
            createProjectUseCase.execute({
                name: "any_project",
                description: "ayn_description",
                category_id: "invalid_category",
                user_id: user.id
            })
        ).rejects.toEqual(new AppErrors("Category does not Exists!"));
    })

})