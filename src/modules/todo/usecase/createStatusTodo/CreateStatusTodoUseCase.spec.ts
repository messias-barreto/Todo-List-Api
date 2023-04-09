import { AppErrors } from '../../../../shared/errors/AppErrors';
import { StatusTodoRepositoryInMemory } from '../../infra/typeorm/repositories/in-memory/StatusTodoRepositoryInMemory';
import { CreateStatusTodoUseCase } from './CreateStatusTodoUseCase';

let createStatusTodoUseCase: CreateStatusTodoUseCase;
let statusTodoRepository: StatusTodoRepositoryInMemory;

describe("Create Status Todo", () => {
    beforeEach(() => {
        statusTodoRepository = new StatusTodoRepositoryInMemory();
        createStatusTodoUseCase = new CreateStatusTodoUseCase(statusTodoRepository);
    });

    it("Shold be able to create a new Status Todo", async () => {
        const category = await createStatusTodoUseCase.execute({
            name: "any_name",
            description: "any_description"
        });

        expect(category).toHaveProperty("id");
    });

    it("Shold not be able to create a new Status Todo if Status Name Already Exists!", async () => {
        await createStatusTodoUseCase.execute({
            name: "any_name",
            description: "any_description"
        })

        await expect(
            createStatusTodoUseCase.execute({
                name: "any_name",
                description: "any_description"
            })
        ).rejects.toEqual(new AppErrors("Status Already Exists!"));
    });
})