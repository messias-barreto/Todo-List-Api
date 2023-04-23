import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateStatusTodoController } from "../../../../modules/todo/usecase/createStatusTodo/CreateStatusTodoController";
import { ListAllStatusTodoController } from "../../../../modules/todo/usecase/listAllStatusTodo/ListAllStatusTodo.controller";
import { ListStatusTodoController } from "../../../../modules/todo/usecase/listStatusTodoById/ListStatusTodoByIdController";

const statusTodoRoutes = Router();

const createStatusTodoController = new CreateStatusTodoController();
const listAllStatusTodoController = new ListAllStatusTodoController();
const listStatusTodoController = new ListStatusTodoController();

statusTodoRoutes.post("/", ensureAuthenticated, createStatusTodoController.handle);
statusTodoRoutes.get("/", ensureAuthenticated, listAllStatusTodoController.handle);
statusTodoRoutes.get("/:id", ensureAuthenticated, listStatusTodoController.handle);

export { statusTodoRoutes }