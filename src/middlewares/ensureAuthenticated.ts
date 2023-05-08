import { NextFunction, Request, Response } from "express";
import { AppErrors } from "../shared/errors/AppErrors";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import { UserTokensRepository } from "../modules/user/infra/typeorm/repository/UserTokensRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppErrors("Token Missing", 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
        
        request.user = {
            id: user_id
        }

        next();
    } catch (error) {
        throw new AppErrors("Invalid Token", 401);
    }
}