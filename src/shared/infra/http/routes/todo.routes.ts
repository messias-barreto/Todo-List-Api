import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CreateTodoController } from "../../../../modules/todo/usecase/createTodo/CreateTodoController";
import { DeleteTodoController } from "../../../../modules/todo/usecase/deleteTodo/DeleteTodoController";
import { FinishTodoController } from "../../../../modules/todo/usecase/finishTodo/FinishTodoController";
import { ListAllTodosByProjectController } from "../../../../modules/todo/usecase/listAllTodosByProject/ListAllTodosByProjectController";

const todoRoutes = Router();

const createTodoController = new CreateTodoController();
const listAllTodosByProjectController = new ListAllTodosByProjectController();
const finishTaskTodo = new FinishTodoController();
const deleteTodoController = new DeleteTodoController();

todoRoutes.post('/:project_id', ensureAuthenticated, createTodoController.handle);
todoRoutes.get('/:project_id', ensureAuthenticated, listAllTodosByProjectController.handle);
todoRoutes.patch('/:id', ensureAuthenticated, finishTaskTodo.handle);
todoRoutes.delete('/:id', ensureAuthenticated, deleteTodoController.handle);

export { todoRoutes };