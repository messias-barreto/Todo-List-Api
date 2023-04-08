import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesProjectRoutes } from "./categoryProject.routes";
import { statusTodoRoutes } from "./statusTodo.routes";
import { usersRoutes } from "./users.routes";

const router = Router();
router.use(authenticateRoutes);

router.use('/users', usersRoutes);
router.use('/categories-project', categoriesProjectRoutes);
router.use('/status-todo', statusTodoRoutes);


export { router };