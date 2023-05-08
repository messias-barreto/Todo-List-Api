import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";


class UpdateProjectController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const { name, description, category_id } = request.body;
        const updateProjectUseCase = container.resolve(UpdateProjectUseCase);
        
        await updateProjectUseCase.execute({
            name,
            description,
            category_id,
            id
        });

        return response.json({message: "Projeto foi Atualizado!"});
    }
}

export { UpdateProjectController }