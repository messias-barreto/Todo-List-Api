import { Router } from "express";
import { CreateUserController } from "../../../../modules/user/useCase/createUser/createUserController";
import { ListProfileUserController } from "../../../../modules/user/useCase/listProfileUser/listProfileUserController";
import { UpdateProfileUserController } from "../../../../modules/user/useCase/updateProfileUser/updateProfileUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listProfileUserController = new ListProfileUserController();
const updateProfileUserController = new UpdateProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", listProfileUserController.handle);
usersRoutes.patch("/:id", updateProfileUserController.handle);

export { usersRoutes };