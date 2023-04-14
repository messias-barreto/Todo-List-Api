import { ProjectRepositoryInMemory } from "../../../project/infra/typeorm/repositories/in-memory/ProjectRepositoryInMemory";
import { TodoRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/TodoRepositoryInMemory";
import { DeleteTodoUseCase } from "./DeleteTodoUseCase";


describe("Delete Todo", () => {
    let todoRepository: TodoRepositoryInMemory;
    let projectRepository: ProjectRepositoryInMemory;
    let deleteTodoUseCase: DeleteTodoUseCase;

    beforeEach(() => {
        todoRepository = new TodoRepositoryInMemory();
        projectRepository = new ProjectRepositoryInMemory();
        deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
    })

    it("Shold be able to delete a Todo", async() => {
        const todo = await todoRepository.create({ 
            title: "any_todo", 
            description: "any_description", 
            status: 'any_status', 
            project_id: 'any_todo_project_id'
        });

        await deleteTodoUseCase.execute(todo.id);
        const find_todo = await todoRepository.findTodoById(todo.id);
        
        expect(find_todo).toEqual(undefined);
    })
})
 