import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateStatusTodoUseCase } from "./createStatusTodoUseCase";

class CreateStatusTodoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createStatusTodoUseCase = container.resolve(CreateStatusTodoUseCase);
        const status = await createStatusTodoUseCase.execute({name, description});

        return response.status(201).json(status);
    }
}

export { CreateStatusTodoController }