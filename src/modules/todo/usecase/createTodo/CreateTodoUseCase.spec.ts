import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ProjectRepositoryInMemory } from "../../../project/infra/typeorm/repositories/in-memory/ProjectRepositoryInMemory";
import { TodoRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/TodoRepositoryInMemory"
import { CreateTodoUseCase } from "./CreateTodoUseCase";



describe("Create a new Todo", () => {
    let todoRepository: TodoRepositoryInMemory;
    let projectRepository: ProjectRepositoryInMemory;
    let createTodoUseCase: CreateTodoUseCase;

    beforeEach(() => {
        todoRepository = new TodoRepositoryInMemory();
        projectRepository = new ProjectRepositoryInMemory();
        createTodoUseCase = new CreateTodoUseCase(todoRepository, projectRepository);
    })

    it("Shold be able to Create Todo!", async() => {
        const project = await projectRepository.create({
            name: "any_title",
            description: "any_description",
            category_id: "any_category",
            user_id: "any_user"
        });

        const todo = await createTodoUseCase.execute({ 
            title: "any_todo", 
            description: "any_description", 
            status: 'any_status', 
            project_id: project.id
        })

        expect(todo).toHaveProperty("id");
    });

    it("Shold not be able create a new Todo if Project does not Exists!", async() => {
        await projectRepository.create({
            name: "any_title",
            description: "any_description",
            category_id: "any_category",
            user_id: "any_user"
        });

        await expect(
            createTodoUseCase.execute({ 
                title: "any_todo", 
                description: "any_description", 
                status: 'any_status', 
                project_id: 'incorrect_project'
            })
        ).rejects.toEqual(new AppErrors("Project does not Exists!"));
    });


    it("Shold not be able create a new Todo if Name already Exists!", async() => {
        const project = await projectRepository.create({
            name: "any_title",
            description: "any_description",
            category_id: "any_category",
            user_id: "any_user"
        });

        await createTodoUseCase.execute({ 
            title: "any_todo", 
            description: "any_description", 
            project_id: project.id
        });

        await expect(
            createTodoUseCase.execute({ 
                title: "any_todo", 
                description: "any_description", 
                project_id: project.id
            })
        ).rejects.toEqual(new AppErrors("Todo already Exists!"))
    });

})