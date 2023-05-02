import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateProjectController } from "../../../../modules/project/useCases/createProject/CreateProjectController";
import { DeleteProjectController } from "../../../../modules/project/useCases/deleteProject/DeleteProjectController";
import { ListAllUserProjectController } from "../../../../modules/project/useCases/listAllUserProject/ListAllUserProjectController";
import { ListProjectByIdController } from "../../../../modules/project/useCases/listProjectById/ListProjectController";
import { UpdateProjectController } from "../../../../modules/project/useCases/updateProject/UpdateProjectController";

const projectRoutes = Router();

const createProjectController = new CreateProjectController();
const listAllUserProjectController = new ListAllUserProjectController();
const listProjectByIdController = new ListProjectByIdController();
const updateProjectController = new UpdateProjectController();
const deleteProjectController = new DeleteProjectController();

projectRoutes.post("/", ensureAuthenticated, createProjectController.handle);
projectRoutes.get("/", ensureAuthenticated, listAllUserProjectController.handle);
projectRoutes.get("/:id", ensureAuthenticated, listProjectByIdController.handle);
projectRoutes.patch("/:id", ensureAuthenticated, updateProjectController.handle);
projectRoutes.delete("/:id", ensureAuthenticated, deleteProjectController.handle);

export { projectRoutes };