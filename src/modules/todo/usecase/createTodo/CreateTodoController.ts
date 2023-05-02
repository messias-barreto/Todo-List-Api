import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTodoUseCase } from "./CreateTodoUseCase";


class CreateTodoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { project_id } = request.params;
        const { title, description, status } = request.body;

        const createTodoUseCaseUseCase = container.resolve(CreateTodoUseCase);
        const todo = await createTodoUseCaseUseCase.execute({
                                                                title, 
                                                                description, 
                                                                project_id,
                                                                status
        });

        return response.status(201).json(todo);
    }
}

export { CreateTodoController }