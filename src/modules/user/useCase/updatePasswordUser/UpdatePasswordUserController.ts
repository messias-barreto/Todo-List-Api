import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePasswordUserUseCase } from "./UpdatePasswordUserUseCase";


class UpdatePasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { password } = request.body;

        const updatePasswordUseCase = container.resolve(UpdatePasswordUserUseCase);
        await updatePasswordUseCase.execute(id, password);

        return response.json({ message: "Password was Updated!"})
    }
}

export { UpdatePasswordUserController }