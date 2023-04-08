import { Router } from "express";
import { CreateStatusTodoController } from "../../../../modules/todo/usecase/createStatusTodo/createStatusTodoController";
import { ListStatusTodoController } from "../../../../modules/todo/usecase/listStatusTodoById/listStatusTodoByIdController";

const statusTodoRoutes = Router();

const createStatusTodoController = new CreateStatusTodoController();
const listStatusTodoController = new ListStatusTodoController();

statusTodoRoutes.post("/", createStatusTodoController.handle);
statusTodoRoutes.get("/:id", listStatusTodoController.handle);

export { statusTodoRoutes }