import { StatusTodoRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/StatusTodoRepositoryInMemory";
import { CreateStatusTodoUseCase } from "../createStatusTodo/createStatusTodoUseCase";
import { ListStatusTodoUseCase } from "./listStatusTodoByIdUseCase";

describe("List Status Todo", () => {
    let statusTodoUseCase: StatusTodoRepositoryInMemory;
    let createStatusTodoUseCase: CreateStatusTodoUseCase;
    let listStatusTodoUseCase: ListStatusTodoUseCase;

    beforeEach(() => {
        statusTodoUseCase = new StatusTodoRepositoryInMemory();
        createStatusTodoUseCase = new CreateStatusTodoUseCase(statusTodoUseCase);
        listStatusTodoUseCase = new ListStatusTodoUseCase(statusTodoUseCase);
    });

    it("Shold be able to list status todo by id", async () => {
        const category = await createStatusTodoUseCase.execute({
            name: "any_name",
            description: "any_description"
        });
        
        const list_category = await listStatusTodoUseCase.execute(category.id);
        expect(list_category).toEqual(category);
    })
})