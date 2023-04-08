import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateStatusTodoController } from "../../../../modules/todo/usecase/createStatusTodo/CreateStatusTodoController";
import { ListStatusTodoController } from "../../../../modules/todo/usecase/listStatusTodoById/ListStatusTodoByIdController";

const statusTodoRoutes = Router();

const createStatusTodoController = new CreateStatusTodoController();
const listStatusTodoController = new ListStatusTodoController();

statusTodoRoutes.post("/", ensureAuthenticated, createStatusTodoController.handle);
statusTodoRoutes.get("/:id", ensureAuthenticated, listStatusTodoController.handle);

export { statusTodoRoutes }