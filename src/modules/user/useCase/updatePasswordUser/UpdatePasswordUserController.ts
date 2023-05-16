import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePasswordUserUseCase } from "./UpdatePasswordUserUseCase";


class UpdatePasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { currentPassword, newPassword } = request.body;

        const updatePasswordUseCase = container.resolve(UpdatePasswordUserUseCase);
        await updatePasswordUseCase.execute(id, currentPassword, newPassword);

        return response.json({ message: "Senha foi Atualizada!"})
    }
}

export { UpdatePasswordUserController }