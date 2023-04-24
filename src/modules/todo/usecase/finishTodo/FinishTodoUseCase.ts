import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ITodoDTO } from "../../dtos/ITodoDTO";
import { ITodoRepository } from "../../interfaces/ITodoRepository";

@injectable()
class FinishTodoUseCase {
    constructor(
        @inject("TodoRepository")
        private todoRepository: ITodoRepository
    ){}
    async execute(status: string, id: string):Promise<void> {
        const todoAlreadyExists = await this.todoRepository.findTodoById(id);
        if(!todoAlreadyExists){
            throw new AppErrors("Todo does note Exists!");
        }

        await this.todoRepository.finishTaskTodo(id, status);
    }
}

export { FinishTodoUseCase }