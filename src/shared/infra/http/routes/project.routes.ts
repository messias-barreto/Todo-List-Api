import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateProjectController } from "../../../../modules/project/useCases/createProject/CreateProjectController";

const projectRoutes = Router();

const createProjectController = new CreateProjectController();

projectRoutes.post("/", ensureAuthenticated, createProjectController.handle);

export { projectRoutes };