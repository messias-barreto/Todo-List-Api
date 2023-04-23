import { StatusTodoRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/StatusTodoRepositoryInMemory";
import { CreateStatusTodoUseCase } from "../createStatusTodo/CreateStatusTodoUseCase";
import { ListAllStatusTodoUseCase } from "./ListAllStatusTodo";

describe("List All Status Todo", () => {
    let statusTodoUseCase: StatusTodoRepositoryInMemory;
    let createStatusTodoUseCase: CreateStatusTodoUseCase;
    let listStatusTodoUseCase: ListAllStatusTodoUseCase;

    beforeEach(() => {
        statusTodoUseCase = new StatusTodoRepositoryInMemory();
        createStatusTodoUseCase = new CreateStatusTodoUseCase(statusTodoUseCase);
        listStatusTodoUseCase = new ListAllStatusTodoUseCase(statusTodoUseCase);
    });

    it("Shold be able to list All status todo by id", async () => {
        const category = await createStatusTodoUseCase.execute({
            name: "any_name",
            description: "any_description"
        });
        
        const list_category = await listStatusTodoUseCase.execute();
        expect(list_category).toEqual([category]);
    })
})