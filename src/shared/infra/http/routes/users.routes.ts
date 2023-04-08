import { Router } from "express";
import { CreateUserController } from "../../../../modules/user/useCase/createUser/createUserController";
import { ListProfileUserController } from "../../../../modules/user/useCase/listProfileUser/listProfileUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listProfileUserController = new ListProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", listProfileUserController.handle);



export { usersRoutes };