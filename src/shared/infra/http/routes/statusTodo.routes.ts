import { Router } from "express";
import { CreateStatusTodoController } from "../../../../modules/todo/usecase/createStatusTodo/CreateStatusTodoController";
import { ListStatusTodoController } from "../../../../modules/todo/usecase/listStatusTodoById/ListStatusTodoByIdController";

const statusTodoRoutes = Router();

const createStatusTodoController = new CreateStatusTodoController();
const listStatusTodoController = new ListStatusTodoController();

statusTodoRoutes.post("/", createStatusTodoController.handle);
statusTodoRoutes.get("/:id", listStatusTodoController.handle);

export { statusTodoRoutes }