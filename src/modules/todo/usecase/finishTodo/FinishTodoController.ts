import { Request, Response } from "express";
import { container } from "tsyringe";
import { FinishTodoUseCase } from "./FinishTodoUseCase";


class FinishTodoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { status } = request.body;

        const finishTodoUseCase = container.resolve(FinishTodoUseCase);
        await finishTodoUseCase.execute(status, id);

        return response.json({message: 'Todo is already updated'})
    }
}

export { FinishTodoController }