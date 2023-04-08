import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesProjectUseCase } from "./listCategoryProjectUseCase";

class ListCategoryProjectController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const listCategoriesProjectUseCase = container.resolve(ListCategoriesProjectUseCase);
        
        const category = await listCategoriesProjectUseCase.execute(id);
        return response.json(category);
    }
}

export { ListCategoryProjectController }