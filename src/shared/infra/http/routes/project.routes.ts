import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateProjectController } from "../../../../modules/project/useCases/createProject/CreateProjectController";
import { ListAllUserProjectController } from "../../../../modules/project/useCases/listAllUserProject/ListAllUserProjectController";
import { UpdateProjectController } from "../../../../modules/project/useCases/updateProject/UpdateProjectController";

const projectRoutes = Router();

const createProjectController = new CreateProjectController();
const listAllUserProjectController = new ListAllUserProjectController();
const updateProjectController = new UpdateProjectController();

projectRoutes.post("/", ensureAuthenticated, createProjectController.handle);
projectRoutes.get("/", ensureAuthenticated, listAllUserProjectController.handle);
projectRoutes.patch("/:id", ensureAuthenticated, updateProjectController.handle);

export { projectRoutes };