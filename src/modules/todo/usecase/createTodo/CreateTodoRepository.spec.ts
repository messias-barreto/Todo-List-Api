import { ProjectRepositoryInMemory } from "../../../project/infra/typeorm/repositories/in-memory/ProjectRepositoryInMemory";
import { TodoRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/TodoRepositoryInMemory"
import { CreateTodoRepository } from "./CreateTodoRepository";



describe("Create a new Todo", () => {
    let todoRepository: TodoRepositoryInMemory;
    let projectRepository: ProjectRepositoryInMemory;
    let createTodoRepository: CreateTodoRepository;

    beforeEach(() => {
        todoRepository = new TodoRepositoryInMemory();
        projectRepository = new ProjectRepositoryInMemory();
        createTodoRepository = new CreateTodoRepository(todoRepository, projectRepository);
    })

    it("Shold be able to Create Todo!", async() => {
        const project = await projectRepository.create({
            name: "any_title",
            description: "any_description",
            category_id: "any_category",
            user_id: "any_user"
        });

        const todo = await createTodoRepository.execute({ 
            title: "any_todo", 
            description: "any_description", 
            status: 1, 
            project_id: project.id
        })

        expect(todo).toHaveProperty("id");
    })
})