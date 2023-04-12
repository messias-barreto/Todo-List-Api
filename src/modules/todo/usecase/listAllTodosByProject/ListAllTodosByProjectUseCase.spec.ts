import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ProjectRepositoryInMemory } from "../../../project/infra/typeorm/repositories/in-memory/ProjectRepositoryInMemory";
import { TodoRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/TodoRepositoryInMemory";
import { CreateTodoUseCase } from "../createTodo/CreateTodoUseCase";
import { ListAllTodosProjectUseCase } from "./ListAllTodosByProjectUseCase";


describe("List All Todos By Project", () => {
    let todoRepository: TodoRepositoryInMemory;
    let projectRepository: ProjectRepositoryInMemory;
    let createTodoUseCase: CreateTodoUseCase;
    let listTodoUseCase: ListAllTodosProjectUseCase;

    beforeEach(() => {
        todoRepository = new TodoRepositoryInMemory();
        projectRepository = new ProjectRepositoryInMemory();
        createTodoUseCase = new CreateTodoUseCase(todoRepository, projectRepository);
        listTodoUseCase = new ListAllTodosProjectUseCase(todoRepository, projectRepository);
    })

    it("Shold be able to list All Project's Todo", async() => {
        const project = await projectRepository.create({
            name: "any_title",
            description: "any_description",
            category_id: "any_category",
            user_id: "any_user"
        });
        
        const todo = await todoRepository.create({ 
            title: "any_todo", 
            description: "any_description", 
            status: 'any_status', 
            project_id: project.id
        })

        const find_todo = await listTodoUseCase.execute(todo.project_id);
        expect(find_todo).toEqual([todo]);
    })

    it("Shold not be able to list All Project's Todo if Project does not exists!", async() => {
        const project = await projectRepository.create({
            name: "any_title",
            description: "any_description",
            category_id: "any_category",
            user_id: "any_user"
        });
        
        await todoRepository.create({ 
            title: "any_todo", 
            description: "any_description", 
            status: 'any_status', 
            project_id: project.id
        });

        await expect(
            listTodoUseCase.execute('incorrect_project_id')
        ).rejects.toEqual(new AppErrors("Project Does Not Exists!")) 
    })
})