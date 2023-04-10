import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllUserProjectUseCase } from "./ListAllUserProjectUseCase";


class ListAllUserProjectController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listAllUserProjectUseCase = container.resolve(ListAllUserProjectUseCase);
        const projects = await listAllUserProjectUseCase.execute(id);
        
        return response.json(projects);
    }
}

export { ListAllUserProjectController }