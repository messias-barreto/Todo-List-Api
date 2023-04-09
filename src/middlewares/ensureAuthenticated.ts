import { NextFunction, Request, Response } from "express";
import { AppErrors } from "../shared/errors/AppErrors";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import { UserRepository } from "../modules/user/infra/typeorm/repository/UserRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppErrors("Token Missing")
    }

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

        const usersRepository = new UserRepository();
        const user = await usersRepository.findUserById(user_id);
        if (!user) {
            throw new AppErrors("Users does not Exists!");
        }
        
        request.user = {
            id: user_id
        }

        next();
    } catch (error) {
        throw new AppErrors("Invalid Token");
    }
}