import { AppErrors } from '../../../../shared/errors/AppErrors';
import { UserRepositoryInMemory } from "../../../user/infra/typeorm/repository/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../user/useCase/createUser/CreateUserUseCase";
import { CategoriesProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesProjectRepositoryInMemory";
import { ProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/ProjectRepositoryInMemory";
import { CreateCategoryProjectUseCase } from "../createCategoryProject/CreateCategoryProjectUseCase";
import { CreateProjectUseCase } from "../createProject/CreateProjectUseCase";
import { ListAllUserProjectUseCase } from "./ListAllUserProjectUseCase";


describe("List All User Projects", () => {
    let projectRepository: ProjectRepositoryInMemory;
    let userRepository: UserRepositoryInMemory;
    let categoriesProjectRepository: CategoriesProjectRepositoryInMemory;

    let createUserUseCase: CreateUserUseCase;
    let createCategoryProjectUseCase: CreateCategoryProjectUseCase;
    let createProjectUseCase: CreateProjectUseCase; 
    let listAllUserProjectUseCase: ListAllUserProjectUseCase;

    beforeEach(() => {
        projectRepository = new ProjectRepositoryInMemory();
        userRepository = new UserRepositoryInMemory();
        categoriesProjectRepository = new CategoriesProjectRepositoryInMemory();

        createUserUseCase = new CreateUserUseCase(userRepository);
        createCategoryProjectUseCase = new CreateCategoryProjectUseCase(categoriesProjectRepository);
        createProjectUseCase = new CreateProjectUseCase(projectRepository);
        listAllUserProjectUseCase = new ListAllUserProjectUseCase(projectRepository, userRepository);
    });

    it("Shold be able to list All User Project", async () => {
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

        const create_project = await createProjectUseCase.execute({
            name: "any_project",
            description: "any_description",
            category_id: category.id,
            user_id: user.id
        })

        const project = await listAllUserProjectUseCase.execute(user.id);
        expect(project).toEqual([create_project]);
    });

    it("Shold not be able to list User if user does not Exists!", async () => {
        await expect(
            listAllUserProjectUseCase.execute("invalid_user_id")
        ).rejects.toEqual(new AppErrors("User does not Exists!"))
    })
})