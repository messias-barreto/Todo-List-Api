import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTodoUseCase } from "./DeleteTodoUseCase";


class DeleteTodoController { 
    async handle(request: Request, response:  Response):Promise<Response> {
        const { id } = request.params;
        const deleteTodoUseCase = container.resolve(DeleteTodoUseCase);
        await deleteTodoUseCase.execute(id);

        return response.json({ message: "Todo was Deleted!"})
    }
}

export { DeleteTodoController }