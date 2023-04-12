import { Router } from "express";
import { CreateTodoController } from "../../../../modules/todo/usecase/createTodo/CreateTodoController";

const todoRoutes = Router();

const createTodoController = new CreateTodoController();

todoRoutes.post('/:project_id', createTodoController.handle);

export { todoRoutes };