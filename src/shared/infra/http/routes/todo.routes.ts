import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateTodoController } from "../../../../modules/todo/usecase/createTodo/CreateTodoController";
import { ListAllTodosByProjectController } from "../../../../modules/todo/usecase/listAllTodosByProject/ListAllTodosByProjectController";

const todoRoutes = Router();

const createTodoController = new CreateTodoController();
const listAllTodosByProjectController = new ListAllTodosByProjectController();

todoRoutes.post('/:project_id', ensureAuthenticated, createTodoController.handle);
todoRoutes.get('/:project_id', ensureAuthenticated, listAllTodosByProjectController.handle);

export { todoRoutes };