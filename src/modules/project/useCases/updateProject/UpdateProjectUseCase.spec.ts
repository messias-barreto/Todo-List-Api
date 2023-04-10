import { AppErrors } from "../../../../shared/errors/AppErrors";
import { UserRepositoryInMemory } from "../../../user/infra/typeorm/repository/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../user/useCase/createUser/CreateUserUseCase";
import { CategoriesProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesProjectRepositoryInMemory";
import { ProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/ProjectRepositoryInMemory";
import { CreateCategoryProjectUseCase } from "../createCategoryProject/CreateCategoryProjectUseCase";
import { CreateProjectUseCase } from "../createProject/CreateProjectUseCase";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";


describe("Update Project", () => {
    let projectRepository: ProjectRepositoryInMemory;
    let userRepository: UserRepositoryInMemory;
    let categoriesProjectRepository: CategoriesProjectRepositoryInMemory;
    
    let createUserUseCase: CreateUserUseCase;
    let createCategoryProjectUseCase: CreateCategoryProjectUseCase;
    let createProjectUseCase: CreateProjectUseCase;
    let updateProjectUseCase: UpdateProjectUseCase;

    beforeEach(() => {
        projectRepository = new ProjectRepositoryInMemory();
        userRepository = new UserRepositoryInMemory();
        categoriesProjectRepository = new CategoriesProjectRepositoryInMemory();

        createUserUseCase = new CreateUserUseCase(userRepository);
        createCategoryProjectUseCase = new CreateCategoryProjectUseCase(categoriesProjectRepository);
        createProjectUseCase = new CreateProjectUseCase(
                                                projectRepository, 
                                                categoriesProjectRepository,
                                                userRepository);

        updateProjectUseCase = new UpdateProjectUseCase(
                                                projectRepository, 
                                                categoriesProjectRepository);
    });


    it("Shold be able Update Project",  async() => {
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

        await updateProjectUseCase.execute({
            name: "any_project_updated",
            description: "any_description_updated",
            category_id: category.id,
            id: project.id
        });

        const updated_project = await projectRepository.findProjectsById(project.id);
        expect(updated_project.name).toEqual("any_project_updated");
        expect(updated_project.description).toEqual("any_description_updated");
    })

    it("Shold not be able Update Project if project does not found!",  async() => {
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

      await expect(
          updateProjectUseCase.execute({
              name: "any_project_updated",
              description: "any_description_updated",
              category_id: category.id,
              id: "incorrect Project"
          })
      ).rejects.toEqual(new AppErrors("Project does not Found!"))
  })

})