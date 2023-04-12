import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTodoRepository } from "./CreateTodoRepository";


class CreateTodoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { project_id } = request.params;
        const { title, description } = request.body;

        const createTodoRepositoryUseCase = container.resolve(CreateTodoRepository);
        const todo = await createTodoRepositoryUseCase.execute({
                                                                title, 
                                                                description, 
                                                                project_id
        });

        return response.status(201).json(todo);
    }
}

export { CreateTodoController }