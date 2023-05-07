import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/user/useCase/createUser/CreateUserController";
import { ListProfileUserController } from "../../../../modules/user/useCase/listProfileUser/ListProfileUserController";
import { UpdatePasswordUserController } from "../../../../modules/user/useCase/updatePasswordUser/UpdatePasswordUserController";
import { UpdateProfileUserController } from "../../../../modules/user/useCase/updateProfileUser/UpdateProfileUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listProfileUserController = new ListProfileUserController();
const updateProfileUserController = new UpdateProfileUserController();
const updatePasswordUserController = new UpdatePasswordUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", ensureAuthenticated, listProfileUserController.handle);
usersRoutes.patch("/profile", ensureAuthenticated, updateProfileUserController.handle);
usersRoutes.patch("/password", ensureAuthenticated, updatePasswordUserController.handle);

export { usersRoutes };