import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ITodoRepository } from "../../interfaces/ITodoRepository";

class DeleteTodoUseCase { 
    constructor(
        private todoRepository: ITodoRepository
    ){}
    async execute(id: string):Promise<any> {
        const todoAlreadyExists = await this.todoRepository.findTodoById(id);
        
        if(!todoAlreadyExists) {
            throw new AppErrors("Todo does not Exists!", 400);
        }

        await this.todoRepository.deleteTodo(id);
        return { status: 200 }
    }
}

export { DeleteTodoUseCase }