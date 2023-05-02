import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProjectByIdUseCase } from "./ListAllUserProjectUseCase";


class ListProjectByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listProjectByIdUseCase = container.resolve(ListProjectByIdUseCase);
        const projects = await listProjectByIdUseCase.execute(id);
        
        return response.json(projects);
    }
}

export { ListProjectByIdController }