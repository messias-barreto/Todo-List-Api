import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProfileUserUseCase } from "./UpdateProfileUserUseCase";


class UpdateProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, login, password } = request.body;

        const updateProfileUserUseCase = container.resolve(UpdateProfileUserUseCase);
        await updateProfileUserUseCase.execute({ name, login, password, id });
        
        return response.json({ message: "User Updated" });
    }
}

export { UpdateProfileUserController }