import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListStatusTodoUseCase } from "./listStatusTodoByIdUseCase";

class ListStatusTodoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const listStatusTodoUseCase = container.resolve(ListStatusTodoUseCase);
        
        const category = await listStatusTodoUseCase.execute(id);
        return response.json(category);
    }
}

export { ListStatusTodoController }