import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProjectUseCase } from "./CreateProjectUseCase";


class CreateProjectController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { name, description, category_id } = request.body;
        
        const createProjectUseCase = container.resolve(CreateProjectUseCase);
        const project = await createProjectUseCase.execute({ 
            name, 
            description, 
            category_id, 
            user_id: id 
        });

        return response.status(201).json({message: 'Projeto foi Adicionado!', project});
    }
}

export { CreateProjectController }