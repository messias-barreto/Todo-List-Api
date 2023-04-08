import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProfileUserUseCase } from "./ListProfileUserUseCase";



class ListProfileUserController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;

        const userUseCase = container.resolve(ListProfileUserUseCase);
        const user = await userUseCase.execute(id);

        return response.json(user);
    }
}


export { ListProfileUserController }