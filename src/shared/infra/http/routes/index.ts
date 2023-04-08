import { Router } from "express";
import { categoriesProjectRoutes } from "./categoryProject.routes";
import { statusTodoRoutes } from "./statusTodo.routes";

const router = Router();
router.use('/categories-project', categoriesProjectRoutes);
router.use('/status-todo', statusTodoRoutes);

export { router };