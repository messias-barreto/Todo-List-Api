import { inject, injectable } from "tsyringe";
import { StatusTodo } from "../../infra/typeorm/entities/StatusTodo";
import { IStatusTodoRepository } from "../../interfaces/IStatusTodoRepository";

@injectable()
class ListStatusTodoUseCase {
    constructor(
        @inject("StatusTodoRepository")
        private listTodoRepository: IStatusTodoRepository
    ) {}

    async execute(id: string): Promise<StatusTodo> {
        return await this.listTodoRepository.findCategoryById(id);
    }
}

export { ListStatusTodoUseCase }