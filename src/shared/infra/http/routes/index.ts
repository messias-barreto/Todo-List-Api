import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesProjectRoutes } from "./categoryProject.routes";
import { projectRoutes } from "./project.routes";
import { statusTodoRoutes } from "./statusTodo.routes";
import { todoRoutes } from "./todo.routes";
import { usersRoutes } from "./users.routes";

const router = Router();
router.use(authenticateRoutes);

router.use('/users', usersRoutes);
router.use('/categories-project', categoriesProjectRoutes);
router.use('/status-todo', statusTodoRoutes);
router.use('/projects', projectRoutes);
router.use('/todos', todoRoutes);


export { router };