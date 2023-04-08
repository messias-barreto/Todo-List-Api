import { Router } from "express";
import { CreateCategoryProjectController } from "../../../../modules/project/useCases/createCategoryProject/CreateCategoryProjectController";
import { ListAllCategoriesProjectController } from "../../../../modules/project/useCases/listAllCategoriesProject/ListAllCategoriesProjectController";
import { ListCategoryProjectController } from "../../../../modules/project/useCases/listCategoriesProject/ListCategoryProjectController";

const categoriesProjectRoutes = Router();

const createCategoryProjectController = new CreateCategoryProjectController();
const listAllCategoriesProjecetController = new ListAllCategoriesProjectController();
const listCategoryProjectController = new ListCategoryProjectController();

categoriesProjectRoutes.post("/", createCategoryProjectController.handle);
categoriesProjectRoutes.get("/", listAllCategoriesProjecetController.handle);
categoriesProjectRoutes.get("/:id", listCategoryProjectController.handle);

export { categoriesProjectRoutes }