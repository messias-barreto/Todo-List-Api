import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { login, password } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        const token = await authenticateUserUseCase.execute(login, password);
        
        return response.json(token);
    }
}

export { AuthenticateUserController }