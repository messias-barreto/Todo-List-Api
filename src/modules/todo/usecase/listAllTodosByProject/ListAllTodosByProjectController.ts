import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ListAllTodosProjectUseCase } from './ListAllTodosByProjectUseCase';


class ListAllTodosByProjectController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { project_id } = request.params;
        const listAllTodosByProjectUseCase = container.resolve(ListAllTodosProjectUseCase);
        const todos = await listAllTodosByProjectUseCase.execute(project_id);

        return response.json(todos);
    }
}

export { ListAllTodosByProjectController }