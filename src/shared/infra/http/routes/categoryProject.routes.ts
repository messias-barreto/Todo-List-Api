import { Router } from "express";
import { CreateCategoryProjectController } from "../../../../modules/project/useCases/createCategoryProject/createCategoryProjectController";
import { ListCategoryProjectController } from "../../../../modules/project/useCases/listCategoriesProject/listCategoryProjectController";

const categoriesProjectRoutes = Router();

const createCategoryProjectController = new CreateCategoryProjectController();
const listCategoryProjectController = new ListCategoryProjectController();

categoriesProjectRoutes.post("/", createCategoryProjectController.handle);
categoriesProjectRoutes.get("/:id", listCategoryProjectController.handle);

export { categoriesProjectRoutes }