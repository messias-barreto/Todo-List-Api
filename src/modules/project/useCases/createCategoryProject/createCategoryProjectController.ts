import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryProjectUseCase } from "./createCategoryProjectUseCase";


class CreateCategoryProjectController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        
        const createCategoriesProjectUseCase = container.resolve(CreateCategoryProjectUseCase);
        const category = await createCategoriesProjectUseCase.execute({name, description});
        
        return response.status(201).json(category);
    }
}

export { CreateCategoryProjectController }