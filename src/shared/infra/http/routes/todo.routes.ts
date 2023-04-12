import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateTodoController } from "../../../../modules/todo/usecase/createTodo/CreateTodoController";

const todoRoutes = Router();

const createTodoController = new CreateTodoController();

todoRoutes.post('/:project_id', ensureAuthenticated, createTodoController.handle);

export { todoRoutes };