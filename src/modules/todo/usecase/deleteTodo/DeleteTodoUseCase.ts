import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ITodoRepository } from "../../interfaces/ITodoRepository";

@injectable()
class DeleteTodoUseCase { 
    constructor(
        @inject("TodoRepository")
        private todoRepository: ITodoRepository
    ){}
    async execute(id: string):Promise<void> {
        const todoAlreadyExists = await this.todoRepository.findTodoById(id);
        
        if(!todoAlreadyExists) {
            throw new AppErrors("Todo does not Exists!");
        }

        await this.todoRepository.deleteTodo(id);
    }
}

export { DeleteTodoUseCase }