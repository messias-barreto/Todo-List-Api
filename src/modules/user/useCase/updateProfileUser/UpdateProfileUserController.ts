import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProfileUserUseCase } from "./UpdateProfileUserUseCase";


class UpdateProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { name, login, email } = request.body;

        const updateProfileUserUseCase = container.resolve(UpdateProfileUserUseCase);
        await updateProfileUserUseCase.execute({ name, login, email, id });
        
        return response.json({ message: "Dados do Usuário Atualizado!" });
    }
}

export { UpdateProfileUserController }