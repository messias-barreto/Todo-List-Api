import { inject, injectable } from "tsyringe";
import { StatusTodo } from "../../infra/typeorm/entities/StatusTodo";
import { IStatusTodoRepository } from "../../interfaces/IStatusTodoRepository";

@injectable()
class ListAllStatusTodoUseCase {
    constructor(
        @inject("StatusTodoRepository")
        private listTodoRepository: IStatusTodoRepository
    ) {}

    async execute(): Promise<StatusTodo[]> {
        const data = await this.listTodoRepository.findAllStatusTodo();
        return data;
    }
}

export { ListAllStatusTodoUseCase }