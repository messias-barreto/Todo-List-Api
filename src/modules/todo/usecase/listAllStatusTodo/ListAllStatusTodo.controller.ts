import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllStatusTodoUseCase } from "./ListAllStatusTodoUseCase";

class ListAllStatusTodoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAllStatusTodoUseCase = container.resolve(ListAllStatusTodoUseCase);
        
        const statusTodo = await listAllStatusTodoUseCase.execute();
        return response.json(statusTodo);
    }
}

export { ListAllStatusTodoController }