import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllCategoriesProjectUseCase } from "./ListAllCategoriesProjectUseCase";


class ListAllCategoriesProjectController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAllCategoriesProjectUseCase = container.resolve(ListAllCategoriesProjectUseCase);
        const categories = await listAllCategoriesProjectUseCase.execute();

        return response.json(categories);
    }
}

export { ListAllCategoriesProjectController }