import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateCategoryProjectController } from "../../../../modules/project/useCases/createCategoryProject/CreateCategoryProjectController";
import { ListAllCategoriesProjectController } from "../../../../modules/project/useCases/listAllCategoriesProject/ListAllCategoriesProjectController";
import { ListCategoryProjectController } from "../../../../modules/project/useCases/listCategoriesProject/ListCategoryProjectController";

const categoriesProjectRoutes = Router();

const createCategoryProjectController = new CreateCategoryProjectController();
const listAllCategoriesProjecetController = new ListAllCategoriesProjectController();
const listCategoryProjectController = new ListCategoryProjectController();

categoriesProjectRoutes.post("/", ensureAuthenticated, createCategoryProjectController.handle);
categoriesProjectRoutes.get("/", ensureAuthenticated, listAllCategoriesProjecetController.handle);
categoriesProjectRoutes.get("/:id", ensureAuthenticated, listCategoryProjectController.handle);

export { categoriesProjectRoutes }