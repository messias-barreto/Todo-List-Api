import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {name, email, login, password } = request.body;

        const userUseCase = container.resolve(CreateUserUseCase);
        const user = await userUseCase.execute({name, email, login, password});

        return response.status(201).json(user);
    }
}

export { CreateUserController }