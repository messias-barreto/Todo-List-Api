import { Router } from "express";
import { CreateUserController } from "../../../../modules/user/useCase/createUser/createUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);


export { usersRoutes };