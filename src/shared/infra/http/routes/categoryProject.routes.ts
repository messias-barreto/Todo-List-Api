import { Router } from "express";
import { CreateCategoryProjectController } from "../../../../modules/project/useCases/createCategoryProject/createCategoryProjectController";

const categoriesProjectRoutes = Router();

const createCategoryProjectController = new CreateCategoryProjectController();

categoriesProjectRoutes.post("/", createCategoryProjectController.handle);

export { categoriesProjectRoutes }